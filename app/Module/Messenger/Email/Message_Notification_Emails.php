<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Email;

class Message_Notification_Emails {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'wpwax_customer_support_app_rest_insert_user', [ $this, 'cache_user_password' ], 20, 3 );

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

}