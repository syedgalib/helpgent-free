<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Email;

class Send_Signup_Email {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'wpwax_customer_support_app_rest_insert_user', [ $this, 'send_signup_email' ], 20, 3 );
        add_action( 'wpwax_customer_support_app_rest_insert_user_exists', [ $this, 'send_new_message_notification_email' ], 20, 2 );

    }

    /**
     * Send Signup Email
     *
     * @param WP_User|false $user
     * @param WP_REST_Request $request
     * @param bool $creating True when creating user, false when updating user.
     * 
     * @return void
     */
    public function send_signup_email( $user = null, $request = null, $creating = true ) {

        if ( ! $creating ) {
            return;
        }

        if ( ! $this->is_valid_user( $user ) ) {
            return;
        }

        $template_data = [];

        $template_data['email']    = $user->user_email;
        $template_data['password'] = $request['password'];
        
        $to      = $user->user_email;
        $subject = __( 'Wellcome to Support', 'wpwax-customer-support-app' );

        $message = $this->get_email_body( $template_data );
        $headers = $this->get_email_headers( $template_data );

        $this->send_email( $to, $subject, $message, $headers );

    }

    /**
     * Send Signup Email
     *
     * @param WP_User|false $user
     * @param WP_REST_Request $request
     * @param bool $creating True when creating user, false when updating user.
     * 
     * @return void
     */
    public function send_new_message_notification_email( $user = null, $request = null ) {

        if ( ! $this->is_valid_user( $user ) ) {
            return;
        }

        $template_data = [];

        $template_data['email']    = $user->user_email;
        $template_data['password'] = __( 'Your chosen password', 'wpwax-customer-support-app' );
        
        $to      = $user->user_email;
        $subject = __( 'A new conversation has starterd', 'wpwax-customer-support-app' );

        $message = $this->get_email_body( $template_data );
        $headers = $this->get_email_headers( $template_data );

        $this->send_email( $to, $subject, $message, $headers );

    }

    /**
     * Get email body
     * 
     * @param array $data
     * @return string
     */
    public function get_email_body( $data = [] ) {

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
    public function get_email_headers( $data = [] )  {
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
     * @return void
     */
    public function send_email( $to, $subject, $message, $headers ) {
        add_filter( 'wp_mail_content_type', [ $this, 'mail_content_type' ] );

        html_entity_decode( $subject );

        return wp_mail( $to, $subject, $message, $headers );
    }

    /**
     * Is valid user
     * 
     * @param WP_User $user
     * @return bool
     */
    public function is_valid_user( $user ) {
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
     * Get Mail content type
     * 
     * @param array $data
     * @return string
     */
    public function mail_content_type() {
        return 'text/html';
    }

}