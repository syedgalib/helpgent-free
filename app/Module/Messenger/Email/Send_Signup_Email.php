<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Email;

class Send_Signup_Email {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'wpwax_customer_support_app_rest_insert_user', [ $this, 'send_email' ], 20, 3 );

    }

    /**
     * Send Email
     *
     * @param WP_User|false $user
     * @param WP_REST_Request $request
     * @param bool $creating True when creating user, false when updating user.
     * 
     * @return void
     */
    public function send_email( $user = null, $request = null, $creating = true ) {

        if ( ! $creating ) {
            return;
        }

        if ( empty( $user ) ) {
            return;
        }

        if ( empty( $user->user_email ) ) {
            return;
        }

        if ( ! is_email( $user->user_email ) ) {
            return;
        }

        add_filter( 'wp_mail_content_type', [ $this, 'mail_content_type' ] );

        $template_data = [];

        $template_data['email']    = $user->user_email;
        $template_data['password'] = $request['password'];
        
        $to      = $user->user_email;
        $subject = 'Wellcome to Chat Support';
        $subject = html_entity_decode( $subject );

        $message = $this->get_email_body( $template_data );
        $headers = $this->get_email_headers( $template_data );

        wp_mail( $to, $subject, $message, $headers );

    }

    /**
     * Get email body
     * 
     * @param array $data
     * @return string
     */
    public function get_email_body( $data = [] ) {

        $password = ( ! empty( $data['password'] ) ) ? $data['password'] : '';

        return "<b>Password</b>: {$password}";
    }

    /**
     * Get email headers
     * 
     * @param array $data
     * @return string
     */
    public function get_email_headers( $data = [] )  {
        $name  = ! empty( $data['name'] ) ? sanitize_text_field( $data['name'] ) : get_option('blogname');
        $email = ! empty( $data['email'] ) ? sanitize_email( $data['email'] ) : get_option('admin_email');
        
        return "From: {$name} <{$email}>\r\nReply-To: {$email}\r\n";
    }

    /**
     * Get Mail content type
     * 
     * @param array $data
     * @return string
     */
    public function mail_content_type() {
        return 'text/html';
    }

}