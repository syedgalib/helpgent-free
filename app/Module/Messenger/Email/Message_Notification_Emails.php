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
        add_action( 'init', [ $this, 'init' ] );


    }


    public function init() {

        $old_sessions = Message_Model::get_items(['where' => ['session_id' => '960cj661ks0630o0m1q01387wy0n8']]);

        e_var_dump($old_sessions);
    }

    /**
     * Notify all participants
     * 
     * @param array $data Response data
     * @param array $args Request params.
     */
    public function notify_after_message_inserted( $data, $args ) {

        $email_notice = Helper\get_option( 'email_notice', true );
        if( ! $email_notice ) {
            return;
        }

        $users  = [];
        $clints = [];
        $admins = [];

        $old_sessions = Message_Model::get_items(['where' => ['session_id' => $data['session_id']]]);

        wp_send_json($old_sessions);

        //On Message Created
        # Get The Message Owner
            # If The Message Owner is Admin
                # Get The Client Email
                    # Notify Client -> Admin Replied To Your Message

            # If The Message Owner is Client
                # Get The Admin Email
                    # Notify Admin -> A New Message ReceivedOn Message Created
        # Get The Message Owner
            # If The Message Owner is Admin
                # Get The Client Email
                    # Notify Client -> Admin Replied To Your Message

            # If The Message Owner is Client
                # Get The Admin Email
                    # Notify Admin -> A New Message Received


        

        $user         = get_user_by('id', $args['user_id']);
        $old_messages = Message_Model::get_items(['where' => ['user_id' => $args['user_id']]]);
        $old_sessions = Message_Model::get_items(['where' => ['session_id' => $data['session_id']]]);
        $notice_type  = Helper\get_option( 'notice_type', 'first_message' );

        if( 'every_message' === $notice_type ) {
            Message_Notification_Emails::notify_users($user);
        }else{
            if (count($old_messages) < 2) {
                Message_Notification_Emails::notify_first_session_created($user);
            } else if (count($old_sessions) < 2) {
                Message_Notification_Emails::notify_new_session_created($user);
            }
        }
             
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
    public static function notify_first_session_created( $user = null, $args = [] ) {

        if ( ! self::is_valid_user( $user ) ) {
            return;
        }

        $args['subject'] = __( 'Wellcome to Support', 'wpwax-customer-support-app' );
        $args['body']    = __( 'First session created', 'wpwax-customer-support-app' );

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
    public static function notify_users( $user = null, $args = [] ) {

        if ( ! self::is_valid_user( $user ) ) {
            return;
        }

        $args['subject'] = __( 'New Message', 'wpwax-customer-support-app' );
        $args['body']    = __( 'New message form ....', 'wpwax-customer-support-app' );

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

        $args['subject'] = __( 'Wellcome to Support', 'wpwax-customer-support-app' );
        $args['body']    = __( 'New session created', 'wpwax-customer-support-app' );

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

        $template_data = [];

        $template_data['email'] = $user->user_email;
        $template_data['name']  = $user->display_name;
        
        $password = ( ! empty( $args['password'] ) ) ? $args['password'] : self::get_user_cached_password( $user->user_email );
        $template_data['password'] = ( ! empty( $password ) ) ? $password : __( 'Your chosen password', 'wpwax-customer-support-app' );

        $to      = $user->user_email;
        $subject = ( ! empty( $args['subject'] ) ) ? $args['subject'] : __( 'A new conversation has starterd', 'wpwax-customer-support-app' );

        $message = self::get_email_body( $template_data );
        $message = self::email_html( $subject, $message );
        $headers = self::get_email_headers( $template_data );

        return self::send_email( $to, $subject, $message, $headers );
    }

    /**
     * Get email body
     * 
     * @param array $data
     * @return string
     */
    protected static function get_email_body( $data = [] ) {

        $email    = ( ! empty( $data['email'] ) ) ? $data['email'] : '';
        $password = ( ! empty( $data['password'] ) ) ? $data['password'] : '';
        $link     = admin_url();

        ob_start(); ?>

            <h2><?php _e( 'Login Credentials', 'wpwax-customer-support-app' ) ?></h2>
            <p>
                <b><?php _e( 'Email:', 'wpwax-customer-support-app' ) ?></b> <?php echo $email ; ?> <br>
                <b><?php _e( 'Password:', 'wpwax-customer-support-app' ) ?></b> <?php echo $password ; ?> <br>
                <b><?php _e( 'Link:', 'wpwax-customer-support-app' ) ?></b> <?php echo $link ; ?>
            </p>
            
        <?php

        return ob_get_clean();
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
     * Get Mail HTML
     * 
     * @param string $subject
     * @param string $message
     * @return string Email row html
     */
    public static function email_html($subject, $message){
        $site_name = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
        $header = '';
        $email_header_color = Helper\get_option('email_header_color', '#6551f2');
        $allow_email_header = Helper\get_option('email_header', true );
        
        $author = "<a target='_blank' href='https://wpwax.com/'>wpWax</a>";
        if ( $allow_email_header ){
            $header = apply_filters('atbdp_email_header', '<table border="0" cellpadding="0" cellspacing="0" width="600" id="template_header" style=\'background-color: '.$email_header_color.'; color: #ffffff; border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; border-radius: 3px 3px 0 0;\'>
                                            <tr>
                                                <td id="header_wrapper" style="padding: 36px 48px; display: block;">
                                                    <h1 style=\'font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 30px; font-weight: 300; line-height: 150%; margin: 0; text-align: left; text-shadow: 0 1px 0 #ab79a1; color: #ffffff;\'>'.$subject.'</h1>
                                                </td>
                                            </tr>
                                        </table>');
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