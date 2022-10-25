<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Email;

use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;
use WPWaxCustomerSupportApp\Base\Helper;
class Message_Notification_Emails {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'wpwax_customer_support_app_rest_insert_user', [ $this, 'cache_user_password' ], 20, 3 );
        
        add_action( 'helpget_after_message_inserted', [ $this, 'notify_after_message_inserted' ], 10, 2 );
        // add_action( 'init', [ $this, 'init' ] );


    }


    public function init() {

        $clint = '';
        $admins = [];
        $old_sessions = Message_Model::get_items(['where' => ['session_id' => '1d97new0m1768676j4p08zb26k204']]);
        $options = Helper\get_options();
        if( ! empty( $old_sessions ) ) {
            foreach( $old_sessions as $session ) {
                $user_id = ! empty( $session['user_id'] ) ? $session['user_id'] : '';
                if ( Helper\is_user_admin( $session['user_id'] ) ) {
                    array_push( $admins, $user_id );
                } else{
                    $clint = $user_id; 
                }
            }
        }
        $is_user_admin =  Helper\is_user_admin( 1 );
        e_var_dump( [
            'admins' => $admins,
            'logo' => self::website_logo_url(),
            'clint' => $clint,
            'is_user_admin' => $is_user_admin,
        ] );
        die;
    }

    /**
     * Notify all participants
     * 
     * @param array $data Response data
     * @param array $args Request params.
     */
    public function notify_after_message_inserted( $data, $args ) {

        $email_notice       = Helper\get_option( 'enableEmailNotification', true );
        if( ! $email_notice ) {
            return;
        }

        $old_messages = Message_Model::get_items(['where' => ['user_id' => $args['user_id']]]);
        $first_chat = false;
        if (count($old_messages) < 2) {
            $first_chat = true;
        }
        $admin_notice_type  = Helper\get_option( 'adminEmailNotificationType', true );
        if( ! $first_chat && ( 'multiple' !== $admin_notice_type ) ) {
            return;
        }

        $clint = '';
        $admins = [];
        $old_sessions = Message_Model::get_items(['where' => ['session_id' => $data['session_id']]]);
        if( ! empty( $old_sessions ) ) {
            foreach( $old_sessions as $session ) {
                $user_id = ! empty( $session['user_id'] ) ? $session['user_id'] : '';
                if ( Helper\is_user_admin( $session['user_id'] ) ) {
                    array_push( $admins, $user_id );
                } else{
                    $clint = $user_id; 
                }
            }
        }
        $is_user_admin =  Helper\is_user_admin( $data['user_id'] );
        
        if( ! $is_user_admin && $admins ) {
            foreach( $admins as $admin ) {
                // notify admin
                self::notify_new_session_created( $admin, $args );
            }
           return;
        }
        // notify clint
        if( $first_chat ) {
            self::user_greeting_on_first_session_created( $clint, $args );
            return;
        }
        self::notify_new_session_created( $clint, $args );

             
    }

    /**
     * Cache user password
     *
     * @param WP_User|false $user
     * @param WP_REST_Request $request
     */
    public function cache_user_password( $user = null, $request = null, $creating = true ) {

        if ( ! $creating ) {
            return;
        }

        if ( ! self::is_valid_user( $user ) ) {
            return;
        }

        if ( empty( $request['password'] ) ) {
            return;
        }

        $transient_key = 'wpwax_customer_support_app_user_key_' . $user->user_email;

        set_transient( $transient_key, sanitize_text_field( $request['password'] ), 60 );
    }

    /**
     * Notify first session created
     *
     * @param WP_User|false $user
     * @param array $args
     *
     * @return bool
     */
    public static function user_greeting_on_first_session_created( $user = null, $args = [] ) {

        if ( ! self::is_valid_user( $user ) ) {
            return;
        }

        $default = 'Dear {{NAME}},

        Congratulations! Your message has been submitted. One of our agents will connect you shortly. Go to your dashboard {{DASHBOARD_LINK}}
        
        Thanks,
        The Administrator of {{SITE_NAME}}
                            ';

        $args['subject'] = Helper\get_option( 'emailTemplateGreetingSubject', 'Wellcome to Support' );
        $args['body'] = Helper\get_option( 'emailTemplateGreetingBody', $default );

        return self::notify_user( $user, $args );
    }

    /**
     * Notify new session created
     *
     * @param WP_User|false $user
     * @param array $args
     *
     * @return bool
     */
    public static function notify_new_session_created( $user = null, $args = [] ) {

        if ( ! self::is_valid_user( $user ) ) {
            return;
        }

        $default = 'Dear {{NAME}},

        Message Details:
        {{MESSAGE}}';

        $args['subject'] = Helper\get_option( 'emailTemplateMessageSubject', 'New Message from {{REPLIER_NAME}}' );
        $args['body'] = Helper\get_option( 'emailTemplateMessageBody', $default );
        
        return self::notify_user( $user, $args );
    }

    /**
     * Notify User
     *
     * @param WP_User|false $user
     * @param array $args
     *
     * @return bool
     */
    protected static function notify_user( $user = null, $args = [] ) {

        if ( ! self::is_valid_user( $user ) ) {
            return ;
        }

        if( is_numeric( $user ) ) {
            $user = get_user_by( 'id', $user );
        }

        $template_data = [];

        $template_data['email'] = $user->user_email;
        $template_data['name']  = $user->display_name;

        $password = ( ! empty( $args['password'] ) ) ? $args['password'] : self::get_user_cached_password( $user->user_email );
        $template_data['password'] = ( ! empty( $password ) ) ? $password : __( 'Your chosen password', 'wpwax-customer-support-app' );

        $to      = $user->user_email;
        $subject = ! empty( $args['subject'] ) ? $args['subject'] : __( 'A new conversation has starterd', 'wpwax-customer-support-app' );
        $message = ! empty( $args['body'] ) ? $args['body'] : '';

        $subject = self::replace_in_content( $subject, $user, $args );
		$message = self::replace_in_content( $message, $user, $args );

        $message = self::email_html( $subject, $message );
        $headers = self::get_email_headers( $template_data );

        return self::send_email( $to, $subject, $message, $headers );
    }

    /**
     * Get email headers
     *
     * @param array $data
     * @return string
     */
    protected static function get_email_headers( $data = [] )  {
        $name  = ! empty( $data['name'] ) ? sanitize_text_field( $data['name'] ) : get_option('blogname');
        $email = ! empty( $data['email'] ) ? sanitize_email( $data['email'] ) : get_option('admin_email');

        return "From: {$name} <{$email}>\r\nReply-To: {$email}\r\n";
    }


    /**
     * Send Email
     *
     * @param string $to
     * @param string $subject
     * @param string $message
     * @param string $headers
     *
     * @return bool
     */
    protected static function send_email( $to, $subject, $message, $headers ) {
        add_filter( 'wp_mail_content_type', [ self::class, 'mail_content_type' ] );

        html_entity_decode( $subject );

        return wp_mail( $to, $subject, $message, $headers );
    }

    /**
     * Is valid user
     *
     * @param WP_User $user
     * @return bool
     */
    protected static function is_valid_user( $user ) {

        if ( is_numeric( $user ) ) {
            $user = get_user_by( 'id', $user );
        }

        if ( empty( $user ) ) {
            return false;
        }

        if ( empty( $user->user_email ) ) {
            return false;
        }

        if ( ! is_email( $user->user_email ) ) {
            return false;
        }

        return true;
    }

    /**
     * Get user cached password
     *
     * @param string $email
     * @return string Password
     */
    protected static function get_user_cached_password( $email = '', $delete_cache = true ) {

        $transient_key = 'wpwax_customer_support_app_user_key_' . $email;

        $password = get_transient( $transient_key );

        if ( $delete_cache ) {
            delete_transient( $transient_key );
        }


        return $password;
    }

    /**
     * Get Mail content type
     *
     * @param array $data
     * @return string
     */
    public static function mail_content_type() {
        return 'text/html';
    }

    /**
     * It replaces predefined placeholders in the given content.
     *
     * @since 3.1.0
     * @param string  $content The content in which placeholders should be replaced
     * @param int     $order_id [optional] Order ID
     * @param int     $listing_id [optional] Listing ID
     * @param WP_User $user [optional] User Object
     * @see strtr() is better than str_replace() in our case : https://stackoverflow.com/questions/8177296/when-to-use-strtr-vs-str-replace
     * @return string               It returns the content after replacing the placeholder with proper data.
     */
    public function replace_in_content( $content, $user = null, $args = [] ) {
       
        if ( is_numeric( $user ) ) {
            $user = get_user_by( 'id', $user );
        }

        $site_name = get_option( 'blogname' );
        $site_url = site_url();
        $date_format = get_option( 'date_format' );
        $time_format = get_option( 'time_format' );
        $current_time = current_time( 'timestamp' );
        $dashboard_link = Helper\get_dashboard_page_link();

        $find_replace = array(
            '{{NAME}}' => ! empty( $user->display_name ) ? $user->display_name : '',
            '{{REPLIER}}' => ! empty( $user->display_name ) ? $user->display_name : '',
            '{{USERNAME}}' => ! empty( $user->user_login ) ? $user->user_login : '',
            '{{SITE_NAME}}' => $site_name,
            '{{SITE_LINK}}' => sprintf( '<a href="%s">%s</a>', $site_url, $site_name ),
            '{{SITE_URL}}' => sprintf( '<a href="%s">%s</a>', $site_url, $site_url ),
            '{{TODAY}}' => date_i18n( $date_format, $current_time ),
            '{{NOW}}' => date_i18n( $date_format . ' ' . $time_format, $current_time ),
            '{{DASHBOARD_LINK}}' => sprintf( '<a href="%s">%s</a>', $dashboard_link, $dashboard_link ),
            '{{MESSAGE}}' => ! empty( $args['message'] ) ? $args['message'] : '',
        );
        $c = nl2br( strtr( $content, $find_replace ) );
        // we do not want to use br for line break in the order details markup. so we removed that from bulk replacement.
        return $c;

    }

    public static function website_logo_url()
    {
        $custom_logo_id = get_theme_mod( 'custom_logo' );
        $image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
        return $image[0];
    }

    /**
     * Get Mail HTML
     *
     * @param string $subject
     * @param string $message
     * @return string Email row html
     */
    public static function email_html($subject, $message){
        $header = '';
        $logo = '';
        $email_header_color = Helper\get_option('emailHeaderColor', '#6551f2');
        $allow_email_header = Helper\get_option('enableEmailHeader', true );
        $addSiteLogo = Helper\get_option('addSiteLogo', true );
        $author = "<a target='_blank' href='https://wpwax.com/'>wpWax</a>";

        if( $addSiteLogo ) {
            // $logo = '<img src="'.get_site_icon_url().'" alt="Email Logo" width="500" height="600">';
            $logo = '<img src="https://directorist.com/wp-content/themes/dir-theme/assets/svg/core-features/4.svg" alt="Email" width="500" height="600">';
        }
        if ( $allow_email_header ){
            $header = '<table border="0" cellpadding="0" cellspacing="0" width="600" id="template_header" style=\'background-color: '.$email_header_color.'; color: #ffffff; border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; border-radius: 3px 3px 0 0;\'>
                            <tr>
                                <td id="header_wrapper" style="padding: 36px 48px; display: block;">
                                    <h1 style=\'font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 30px; font-weight: 300; line-height: 150%; margin: 0; text-align: left; text-shadow: 0 1px 0 #ab79a1; color: #ffffff;\'>'.$subject.'</h1>
                                </td>
                            </tr>
                        </table>';
    }

        return '<!DOCTYPE html>
    <html lang="en-US">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Directorist</title>
        </head>
        <body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="padding: 0;">
            <div id="wrapper" dir="ltr" style="background-color: #f7f7f7; margin: 0; padding: 70px 0; width: 100%; -webkit-text-size-adjust: none;">
                <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
                    <tr>
                        <td align="center" valign="top">
                            <div id="template_header_image">
                                ' . $logo . '                            
                            </div>
                            <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_container" style="background-color: #ffffff; border: 1px solid #dedede; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); border-radius: 3px;">
                                <tr>
                                    <td align="center" valign="top">
                                        <!-- Header -->
                                        '.$header.'
                                        <!-- End Header -->
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top">
                                        <!-- Body -->
                                        <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body">
                                            <tr>
                                                <td valign="top" id="body_content" style="background-color: #ffffff;">
                                                    <!-- Content -->
                                                    <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td valign="top" style="padding: 48px 48px 32px;">
                                                                <div id="body_content_inner" style=\'color: #636363; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 14px; line-height: 150%; text-align: left;\'>
    '.$message.'
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!-- End Content -->
                                                </td>
                                            </tr>
                                        </table>
                                        <!-- End Body -->
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
              
                    <tr>
                        <td align="center" valign="top">
                            <!-- Footer -->
                            <table border="0" cellpadding="10" cellspacing="0" width="600" id="template_footer">
                                <tr>
                                    <td valign="top">
                                        <table border="0" cellpadding="10" cellspacing="0" width="100%">
                                            <tr>
                                                <td colspan="2" valign="middle" id="credit">
                                                    ' . sprintf( wp_kses_post( wpautop( wptexturize( apply_filters( 'wpwax_customer_support_app_email_footer_text', 'Built with ❤️ by %s' ) ) ) ), $author ) . '
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            <!-- End Footer -->
                        </td>
                    </tr>
                </table>
            </div>
        </body>
    </html>';
    }

}