<?php

namespace HelpGent\Module\Messenger\Email;

use HelpGent\Module\Messenger\Model\Message_Model;
use HelpGent\Module\Core\Model\Auth_Token_Model;
use HelpGent\Base\Helper;
use HelpGent\Module\Messenger\Model\Conversation_Model;

class Message_Notification_Emails {

	/**
	 * Constuctor
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'helpgent_after_message_inserted', [ $this, 'notify_after_message_inserted' ], 10, 2 );
		add_action( 'helpgent_guest_token_created', [ $this, 'notify_after_token_created' ], 1, 20 );
		add_filter( 'helpgent_notify_token_created', [ $this, 'skip_notify_token_created_for_first_conversation' ], 2, 20 );
	}

	/**
	 * Notify the guest user to continue conversation with the generated token
	 *
	 * @param array $data Response data
	 * @param array $args Request params.
	 */
	public function notify_after_token_created( $data ) {
		$should_notify = apply_filters( 'helpgent_notify_token_created', true, $data );

		if ( ! $should_notify ) {
			return;
		}

		$default = 'Dear User,

        Congratulations! Your guest token has been generated and it is valid until ' . HELPGENT_AUTH_TOKEN_EXPIRES_AFTER_DAYS . ' days from now. Go to your dashboard {{CONVERSATION_LINK}}

        Thanks,
        The Administrator of {{SITE_NAME}}
        ';

		$args['subject'] = 'New Token Created';
		$args['body'] = apply_filters('helpgent_new_token_msg', $default);

		$to = $data['email'];

		$subject = ! empty( $args['subject'] ) ? $args['subject'] : '';
		$message = ! empty( $args['body'] ) ? $args['body'] : '';

		$user = Helper\get_user_data_by( 'email', $data['email'] );

		$data['from_name'] = Helper\get_option( 'emailTemplateFromName' );

		$subject = self::replace_in_content( $subject );
		$message = self::replace_in_content( $message, $user, $data );

		$message = self::email_html( $subject, $message );
		$headers = self::get_email_headers();

		return self::send_email( $to, $subject, $message, $headers );
	}

	public function skip_notify_token_created_for_first_conversation( $should_notify = true, $data = [] ) {
		$has_conversation = $this->is_first_conversation( $data['email'] );
		$should_notify    = ! $has_conversation ? false : true;

		return $should_notify;
	}

	/**
	 * Notify all participants
	 *
	 * @param array $data Response data
	 * @param array $args Request params.
	 */
	public function notify_after_message_inserted( $data, $args ) {
		$email_notice = Helper\get_option('enableEmailNotification', true);

		if ( ! $email_notice ) {
			return;
		}

		$is_author_admin = Helper\is_user_admin( $data['user_email'] );
		$users           = $this->get_conversation_users( $data['conversation_id'] );

		$is_first_message_in_conversation = $this->is_first_message_in_conversation( $args['conversation_id'] );
		$is_first_conversation = $this->is_first_conversation( $data['user_email'] );

		$admin_email = Helper\get_option( 'emailTemplateFromEmail' );
		$admin_name  = Helper\get_option( 'emailTemplateFromName' );

		if ( $is_author_admin ) {
			$user = Helper\get_user_data_by( 'email', $data['user_email'] );

			$from_name       = ( ! empty( $user ) ) ? $user['name'] : '';
			$from_email      = $data['user_email'];
			$recipients      = $users['clients'];
			$notification_on = Helper\get_option('clientEmailNotificationOn', 'every_message');
		} else {
			$from_name       = $admin_name;
			$from_email      = $admin_email;
			$recipients      = $users['admins'];
			$notification_on = Helper\get_option('adminEmailNotificationOn', 'every_message');
		}

		$should_notify = ('every_message' === $notification_on);

		if ( $is_first_message_in_conversation && 'first_message' === $notification_on) {
			$should_notify = true;
		}

		if ( ! $should_notify ) {
			return;
		}

		// Send notification for first conversation
		if ( $is_first_conversation && $is_first_message_in_conversation ) {
			$args['from_name'] = $from_name;
			$args['from_user'] = $admin_email;
			self::user_greeting_on_first_conversation_created( $users['clients'][0], $args );
		}

		// Send notification for new message
		foreach ( array_unique( $recipients ) as $recipient ) {
			$args['from_name'] = $from_name;
			$args['from_user'] = $from_email;
			self::notify_new_message_created( $recipient, $args );
		}
	}

	public function is_first_conversation( $email ) {
		$conversations = Conversation_Model::get_items([
			'where' => [
				'created_by' => $email
			],
		]);

		if ( count( $conversations ) === 1 ) {
			return true;
		}

		return false;
	}

	public function is_first_message_in_conversation( $conversation_id ) {
		$messages = Message_Model::get_items( [ 'where' => [ 'conversation_id' => $conversation_id ] ] );
		$messages = $messages['results'];

		if ( count( $messages ) === 1 ) {
			return true;
		}

		return false;
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
			'where'    => [ 'conversation_id' => $conversation_id ],
			'group_by' => 'user_email',
		]);

		if ( empty( $messages['results'] ) ) {
			return $users;
		}

		foreach ( $messages['results'] as $message ) {
			$user_email = ! empty( $message['user_email'] ) ? $message['user_email'] : '';

			if ( empty( $user_email ) ) {
				continue;
			}

			if ( Helper\is_user_admin($message['user_email'] ) ) {
				array_push( $users['admins'], $user_email );
			} else {
				array_push( $users['clients'], $user_email );
			}
		}

		$admin_email = get_option('admin_email');

		if ( empty( $users['admins'] ) && ! empty( $admin_email ) ) {
			array_push( $users['admins'], $admin_email );
		}

		return $users;
	}

	/**
	 * Notify first session created
	 *
	 * @param string $email
	 * @param array $args
	 *
	 * @return bool
	 */
	public static function user_greeting_on_first_conversation_created( $email = '', $args = [] ) {
		$is_guest = Helper\is_user_guest( $email );

		$lead_message = 'You can continue the conversation from the link {{CONVERSATION_LINK}}';

		if ( $is_guest ) {
			$lead_message = 'A token has been generated that can be used to access the conversation and it is valid until ' . HELPGENT_AUTH_TOKEN_EXPIRES_AFTER_DAYS . ' days from now. You can continue conversation from the link {{CONVERSATION_LINK}}';
		}

		$default = "Dear {{NAME}},

		Thank You For Sharing Your Concern.

		We have received your request. A support representative will get back to you within 24 hours.

		$lead_message

		Thanks,
		The Administrator of {{SITE_NAME}}";

		$args['body'] = Helper\get_option( 'emailTemplateGreetingBody', $default );

		if ( $is_guest ) {
			$token = Auth_Token_Model::get_item( $email );

			$args['token'] = ! is_wp_error( $token ) ? $token['token'] : '';
			$args['body']  = Helper\get_option( 'emailTemplateGreetingBodyGuest', $default );
		}

		$args['subject'] = Helper\get_option( 'emailTemplateGreetingSubject', 'Wellcome to Support' );

		return self::notify_user( $email, $args );
	}

	/**
	 * Notify new message created
	 *
	 * @param string $email
	 * @param array $args
	 *
	 * @return bool
	 */
	public static function notify_new_message_created( $email = '', $args = [] ) {
		$default = 'Dear {{NAME}},

        Message Details:
        {{MESSAGE}}
		';

		$args['subject'] = Helper\get_option( 'emailTemplateMessageSubject', 'New Message from {{REPLIER_NAME}}' );
		$args['body']    = Helper\get_option( 'emailTemplateMessageBody', $default );

		return self::notify_user( $email, $args );
	}

	/**
	 * Notify User
	 *
	 * @param string $email
	 * @param array $args
	 *
	 * @return bool
	 */
	protected static function notify_user( $email = '', $args = [] ) {
		if ( ! $email ) {
			return;
		}

		$user = Helper\get_user_data_by( 'email',  $email );

		if ( empty( $user ) ) {
			return;
		}

		$to = $user['email'];

		$token         = Auth_Token_Model::get_item( $user['email'] );
		$args['token'] = ! is_wp_error( $token ) ? $token['token'] : '';

		$subject = ! empty( $args['subject'] ) ? $args['subject'] : __('A new conversation has starterd', 'helpgent');
		$message = ! empty( $args['body'] ) ? $args['body'] : '';

		$subject = self::replace_in_content( $subject, $user, $args );
		$message = self::replace_in_content( $message, $user, $args );

		$message = self::email_html( $subject, $message );
		$headers = self::get_email_headers();

		return self::send_email( $to, $subject, $message, $headers );
	}

	/**
	 * Get email headers
	 *
	 * @param array $data
	 * @return string
	 */
	protected static function get_email_headers( $data = [] ) {
		$name  = ! empty( $data['from_name'] ) ? sanitize_text_field( $data['from_name'] ) : get_option('blogname');
		$email = ! empty( $data['from_user'] ) ? sanitize_email( $data['from_user'] ) : get_option('admin_email');

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
	 * @param array $user [optional] User Object
	 * @see strtr() is better than str_replace() in our case : https://stackoverflow.com/questions/8177296/when-to-use-strtr-vs-str-replace
	 * @return string               It returns the content after replacing the placeholder with proper data.
	 */
	public static function replace_in_content( $content, $user = null, $args = [] ) {
		$token          = ! empty( $args['token'] ) ? $args['token'] : '';
		$site_name      = get_option('blogname');
		$site_url       = site_url();
		$date_format    = get_option('date_format');
		$time_format    = get_option('time_format');
		$current_time   = current_time('timestamp');
		$dashboard_link = Helper\get_dashboard_page_link();
		$dashboard_link = ! empty( $token ) ? add_query_arg('token', $token, $dashboard_link) : $dashboard_link;
		$replier_name   = ( ! empty( $args['from_name'] ) ) ? $args['from_name'] : '';

		$find_replace = array(
			'{{NAME}}'              => ! empty( $user ) && ! empty( $user['name'] ) ? $user['name'] : 'User',
			'{{REPLIER_NAME}}'      => $replier_name,
			'{{USERNAME}}'          => ! empty( $user ) && ! empty( $user['username'] ) ? $user['username'] : 'User',
			'{{SITE_NAME}}'         => $site_name,
			'{{SITE_LINK}}'         => sprintf('<a href="%s" style="color: #1b83fb;">%s</a>', $site_url, $site_name),
			'{{SITE_URL}}'          => sprintf('<a href="%s" style="color: #1b83fb;">%s</a>', $site_url, $site_url),
			'{{TODAY}}'             => date_i18n( $date_format, $current_time ),
			'{{NOW}}'               => date_i18n( $date_format . ' ' . $time_format, $current_time ),
			'{{CONVERSATION_LINK}}' => sprintf( '<a href="%s" style="color: #1b83fb;">%s</a>', $dashboard_link, $dashboard_link ),
			'{{MESSAGE}}'           => ! empty( $args['message'] ) ? $args['message'] : '',
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
	public static function email_html( $subject, $message ) {
		$header = '';
		$footer = '';
		$email_header_color = Helper\get_option('emailHeaderColor', '#6551f2');
		$allow_email_header = Helper\get_option('enableEmailHeader', true);
		$allow_email_footer = Helper\get_option('enableEmailFooter', true);
		$author = "<a target='_blank' href='https://wpwax.com/'>wpWax</a>";

		if ($allow_email_footer) {
			$footer = '<table border="0" cellpadding="10" cellspacing="0" width="600" id="template_footer">
            <tr>
                <td valign="top">
                    <table border="0" cellpadding="10" cellspacing="0" width="100%">
                        <tr>
                            <td colspan="2" valign="middle" id="credit" style="display: flex; justify-content: center; align-items: center">
                                ' . sprintf(wp_kses_post(wpautop(wptexturize(apply_filters('helpgent_email_footer_text', '<span style=\'font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 16px; font-weight: 600;\'>Built with <i style="margin: 0 4px; position: relative; top: 2px;"> ❤️ </i> by %s</span>')))), $author) . '
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>';
		}
		if ($allow_email_header) {
			$header = '<table border="0" cellpadding="0" cellspacing="0" width="600" id="template_header" style=\'background-color: ' . $email_header_color . '; color: #ffffff; border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; border-radius: 20px 20px 0 0;\'>
                            <tr>
                                <td id="header_wrapper" style="padding: 20px 30px; display: block;">
                                    <h1 style=\'font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 20px; font-weight: 500; line-height: 150%; margin: 0; text-align: left; text-shadow: 0 1px 0 #ab79a1; color: #ffffff;\'>' . $subject . '</h1>
                                </td>
                            </tr>
                        </table>';
		}

		return '<!DOCTYPE html>
    <html lang="en-US">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>Directorist</title>

			<style type="text/css"> 
				@media screen and (max-width: 991px) {
					#wrapper {
						padding: 30px 0 !important;
					}

					#wrapper table >tbody >tr >td >table{
						width: 500px;
					}

					#wrapper table >tbody >tr >td >table >tbody >tr >td >table{
						width: 100%;
					}

					#wrapper table table table table tr td{
						padding: 20px !important;
					}

					#wrapper table table table table tr td p{
						margin: 0;
					}
				}
				@media screen and (max-width: 575px) {

					#wrapper table >tbody >tr >td >table{
						width: 340px;
					}

					#wrapper table >tbody >tr >td >table >tbody >tr >td >table{
						width: 100%;
					}
				}
			</style>
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
                                        ' . $header . '
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
                                                                    ' . $message . '
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
                            ' . $footer . '
                            <!-- End Footer -->
                        </td>
                    </tr>
                </table>
            </div>
        </body>
    </html>';
	}
}
