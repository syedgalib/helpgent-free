<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Email;

use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;
use WPWaxCustomerSupportApp\Module\Core\Model\Auth_Token_Model;
use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Messenger\Hooks\Conversation;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Conversation_Model;

class Message_Notification_Emails {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'wpwax_customer_support_app_rest_insert_user', [ $this, 'cache_user_password' ], 20, 3 );
        add_action( 'helpgent_after_message_inserted', [ $this, 'notify_after_message_inserted' ], 10, 2 );
        add_action( 'helpgent_guest_token_created', [ $this, 'notify_after_token_created' ] );
        add_filter( 'wp_mail_from', [ $this, 'mail_from' ] );
        add_filter( 'wp_mail_from_name', [ $this, 'name_from' ] );

    }

    /**
     * Modify name append in recipent name box
     *
     * @param string $name Email from
     * @return string $name Email from
     */
    public function name_from( $name ) {

        if( Helper\get_option( 'emailTemplateFromName' ) ) {
           return Helper\get_option( 'emailTemplateFromName' );
        }
        return $name;
    }

    /**
     * Modify email append in recipent email box
     *
     * @param string $email Email from
     * @return string $email Email from
     */
    public function mail_from( $email ) {

        if( Helper\get_option( 'emailTemplateFromEmail' ) ) {
           return Helper\get_option( 'emailTemplateFromEmail' );
        }
        return $email;
    }

    /**
     * Notify the guest user to continue conversation with the generated token
     *
     * @param array $data Response data
     * @param array $args Request params.
     */
    public function notify_after_token_created( $data ) {

        if ( ! $this->if_has_conversation( $data['email'] ) ) {
            return;
        }

        $default = 'Dear User,

        Congratulations! Your requested token has been re-generated and it is valid until '. HELPGENT_AUTH_TOKEN_EXPIRES_AFTER_DAYS .' days from now. Go to your dashboard {{DASHBOARD_LINK}}

        Thanks,
        The Administrator of {{SITE_NAME}}
                            ';

        $args['subject'] = 'New Token Created';
        $args['body'] = apply_filters( 'helpgent_new_token_msg', $default );

        $to      = $data['email'];

        $subject = ! empty( $args['subject'] ) ? $args['subject'] : '';
        $message = ! empty( $args['body'] ) ? $args['body'] : '';

        $subject = self::replace_in_content( $subject );
		$message = self::replace_in_content( $message );

        $message = self::email_html( $subject, $message );

        $headers = self::get_email_headers( [ 'email' => $to ] );

        return self::send_email( $to, $subject, $message, $headers );
    }

    public function if_has_conversation( $email ) {
        $old_conversation = Conversation_Model::get_items(['where' => ['created_by' => $email]]);

		if ( ! empty( $old_conversation ) ) {
            return true;
        }

        return false;
    }

    public function is_first_conversation( $email ) {
        $old_conversation = Conversation_Model::get_items(['where' => ['created_by' => $email]]);

		if ( count( $old_conversation ) === 1) {
            return true;
        }

        return false;
    }

    public function is_first_message_in_conversation( $conversation_id ) {
        $messages = Message_Model::get_items(['where' => ['conversation_id' => $conversation_id]]);

		if ( count( $messages ) === 1) {
            return true;
        }

        return false;
    }

    /**
     * Notify all participants
     *
     * @param array $data Response data
     * @param array $args Request params.
     */
    public function notify_after_message_inserted( $data, $args ) {
        $email_notice = Helper\get_option( 'enableEmailNotification', true );

		if ( ! $email_notice ) {
            return;
        }

		$is_author_admin = Helper\is_user_admin( $data['user_email'] );
		$users           = $this->get_conversation_users( $data['conversation_id'] );

		$is_first_message_in_conversation = $this->is_first_message_in_conversation( $args['conversation_id'] );
		$is_first_conversation = $this->is_first_conversation( $data['user_email'] );

		if ( $is_author_admin ) {
			$recepents        = $users['clients'];
			$notificationType = Helper\get_option( 'clientEmailNotificationType', 'multiple' );
		} else {
			$recepents        = $users['admins'];
			$notificationType = Helper\get_option( 'adminEmailNotificationType', 'multiple' );
		}

		$should_notify = ( 'multiple' === $notificationType );

		if ( 'single' === $notificationType && $is_first_message_in_conversation ) {
			$should_notify = true;
		}

		if ( ! $should_notify ) {
			return;
		}

		$args['replier'] = $data['user_email'];

		// Send notification for first conversation
		if ( $is_first_conversation ) {
			self::user_greeting_on_first_conversation_created( $data['user_email'], $args );
		}

		// Send notification for new conversation
		foreach( $recepents as $recepent ) {
			self::notify_new_conversation_created( $recepent, $args );
		}

    }

	/**
	 * Get Conversation Users
	 *
	 * @param int $conversation_id
	 * @return array Users
	 */
	public function get_conversation_users( $conversation_id ) {
		$users = [
			'admins'  => [],
			'clients' => [],
		];

		$messages = Message_Model::get_items([
			'where' => [ 'conversation_id' => $conversation_id ]
		]);

		if ( empty( $messages ) ) {
			return $users;
		}

		foreach( $messages as $message ) {
			$user_email = ! empty( $message['user_email'] ) ? $message['user_email'] : '';

			if ( empty( $user_email ) ) {
				continue;
			}

			if ( Helper\is_user_admin( $message['user_email'] ) ) {
				array_push( $users['admins'], $user_email );
			} else {
				array_push( $users['clients'], $user_email );
			}
		}

		return $users;
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
    public static function user_greeting_on_first_conversation_created( $user = null, $args = [] ) {

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
    public static function notify_new_conversation_created( $user = null, $args = [] ) {

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

        if( ! $user ) {
            return;
        }

        $is_guest = Auth_Token_Model::get_item( $user );
        $template_data = [];

        if( is_email( $user ) ) {
            $user = get_user_by( 'email', $user );
            $to      = $user->user_email;
            $template_data['email'] = $user;
            $template_data['name']  = 'User';
        }

        if( $is_guest ) {
            $template_data['email'] = $user;
            $template_data['name']  = 'User';
            $to = $user;
        }

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

        if ( is_email( $user ) ) {
            $user = get_user_by( 'email', $user );
        }

        $guest_token   = Auth_Token_Model::get_item( $user );
        $site_name      = get_option( 'blogname' );
        $site_url       = site_url();
        $date_format    = get_option( 'date_format' );
        $time_format    = get_option( 'time_format' );
        $current_time   = current_time( 'timestamp' );
        $dashboard_link =  Helper\get_dashboard_page_link();
        $replier        = ! empty( $args['replier'] ) ? get_user_by( 'email', $args['replier'] ) : '';
        $replier_name   = ! is_wp_error( $replier ) ? $replier->display_name : 'User';

        $find_replace = array(
            '{{NAME}}' => ! empty( $user->display_name ) ? $user->display_name : 'User',
            '{{REPLIER_NAME}}' => $replier_name,
            '{{USERNAME}}' => ! empty( $user->user_login ) ? $user->user_login : 'User',
            '{{SITE_NAME}}' => $site_name,
            '{{SITE_LINK}}' => sprintf( '<a href="%s" style="color: #1b83fb;">%s</a>', $site_url, $site_name ),
            '{{SITE_URL}}' => sprintf( '<a href="%s" style="color: #1b83fb;">%s</a>', $site_url, $site_url ),
            '{{TODAY}}' => date_i18n( $date_format, $current_time ),
            '{{NOW}}' => date_i18n( $date_format . ' ' . $time_format, $current_time ),
            '{{DASHBOARD_LINK}}' => sprintf( '<a href="%s" style="color: #1b83fb;">%s</a>', ! is_wp_error( $guest_token ) ? add_query_arg( 'token', $guest_token, $dashboard_link ) : $dashboard_link, $dashboard_link ),
            '{{MESSAGE}}' => ! empty( $args['message'] ) ? $args['message'] : '',
        );
        $c = nl2br( strtr( $content, $find_replace ) );
        // we do not want to use br for line break in the order details markup. so we removed that from bulk replacement.
        return $c;

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
        $footer = '';
        $email_header_color = Helper\get_option('emailHeaderColor', '#6551f2');
        $allow_email_header = Helper\get_option('enableEmailHeader', true );
        $allow_email_footer = Helper\get_option('enableEmailFooter', true );
        $author = "<a target='_blank' href='https://wpwax.com/'>wpWax</a>";

        if ( $allow_email_footer ){
            $footer = '<table border="0" cellpadding="10" cellspacing="0" width="600" id="template_footer">
            <tr>
                <td valign="top">
                    <table border="0" cellpadding="10" cellspacing="0" width="100%">
                        <tr>
                            <td colspan="2" valign="middle" id="credit" style="display: flex; justify-content: center; align-items: center">
                                ' . sprintf( wp_kses_post( wpautop( wptexturize( apply_filters( 'wpwax_customer_support_app_email_footer_text', '<span style=\'font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 16px; font-weight: 600;\'>Built with <i style="margin: 0 4px; position: relative; top: 2px;"> ❤️ </i> by %s</span>' ) ) ) ), $author ) . '
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>';
        }
        if ( $allow_email_header ){
            $header = '<table border="0" cellpadding="0" cellspacing="0" width="600" id="template_header" style=\'background-color: '.$email_header_color.'; color: #ffffff; border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; border-radius: 20px 20px 0 0;\'>
                            <tr>
                                <td id="header_wrapper" style="padding: 20px 30px; display: block;">
                                    <h1 style=\'font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 20px; font-weight: 500; line-height: 150%; margin: 0; text-align: left; text-shadow: 0 1px 0 #ab79a1; color: #ffffff;\'>'.$subject.'</h1>
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
                            </div>
                            <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_container" style="background-color: #ffffff; border: 1px solid #dedede; box-shadow: 0 20px 50px rgba(0,0,0,.10); border-radius: 20px;">
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
                                                <td valign="top" id="body_content" style="background-color: #ffffff; border-radius: 20px;">
                                                    <!-- Content -->
                                                    <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td valign="top" style="padding: 50px 30px;">
                                                                <div id="body_content_inner" style=\'color: #636363; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 16px; line-height: 150%; text-align: left;\'>
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
                            '. $footer .'
                            <!-- End Footer -->
                        </td>
                    </tr>
                </table>
            </div>
        </body>
    </html>';
    }

}