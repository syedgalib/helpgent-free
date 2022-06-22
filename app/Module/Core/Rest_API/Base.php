<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API;
use \WP_REST_Controller;
abstract class Base extends WP_REST_Controller {

    /**
     * @var string
     */
    public $namespace = WPWAX_CUSTOMER_SUPPORT_APP_REST_BASE_PREFIX . '/v1';

    /**
     * @var mixed
     */
    public $rest_base;

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    /**
     * @param $value
     */
    public function validate_int( $value ) {
        return is_numeric( $value );
    }

    /**
     * @param $value
     */
    public function validate_email( $value ) {
        return is_email( $value );
    }

    /**
     * @param $value
     */
    public function sanitize_int( $value ) {
        return intval( $value );
    }

    /**
     * @param $is_success
     * @param $data
     */
    public function response( $is_success, $data = null, $message = '' ) {

        $default_message = $is_success ? __( 'Operation Successful', 'wpwax-customer-support-app' ) : __( 'Operation Failed', 'wpwax-customer-support-app' );
        $message = ( ! empty( $message ) ) ? $message : $default_message;

        $response = [
            'success' => $is_success,
            'message' => $message,
            'data'    => $data,
        ];

        return rest_ensure_response( $response );
    }

    public function error_nonce_missing() {
        return new \WP_Error(
            'nonce_missing',
            __( 'Header:X-WP-Nonce is missing' ),
            ['status' => rest_authorization_required_code()]
        );
    }

    public function error_admin_check_failed() {
        return new \WP_Error(
            'admin_check_failed',
            __( 'You are not allowed to perform this operation.' ),
            ['status' => rest_authorization_required_code()]
        );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function check_user_permission( $request ) {
        return true;

		// @todo remove this later

        if ( ! $request->get_header( 'X-WP-Nonce' ) ) {
            return $this->error_nonce_missing();
        }

        return true;
    }

    /**
     * @param $request
     * @return mixed
     */
    public function check_guest_permission( $request ) {
        return true;

		// @todo remove this later

        if ( ! $request->get_header( 'X-WP-Nonce' ) ) {
            return $this->error_nonce_missing();
        }

        return true;
    }

    /**
     * @param $request
     * @return mixed
     */
    public function check_admin_permission( $request ) {
        return true;

		// @todo remove this later

        if ( ! $request->get_header( 'X-WP-Nonce' ) ) {
            return $this->error_nonce_missing();
        }

        if ( ! current_user_can( 'edit_posts' ) ) {
            return $this->error_admin_check_failed();
        }

        return true;
    }
    
    /**
     * Convert string to int array
     * 
     * @param string $string
     * @param string $separator ,
     * @param string $remove_non_int_items true
     * 
     * @return array
     */
    public function convert_string_to_int_array( $string, $separator = ',', $remove_non_int_items = true ) {
        $list = $this->convert_string_to_array( $string, $separator );
        $list = $this->parse_array_items_to_int( $list, $remove_non_int_items );

        return $list;
    }

    /**
     * Convert string to array
     * 
     * @param string $string
     * @param string $separator ,
     * 
     * @return array
     */
    public function convert_string_to_array( $string, $separator = ',' ) {

        $string = trim( $string, ',\s' );
        $list   = explode( $separator, $string );
            
        if ( ! is_array( $list ) ) {
            return [];
        }

        return $list;
    }

    /**
     * Parse array items to int
     * 
     * @param array $list
     * 
     * @return array
     */
    public function parse_array_items_to_int( $list = [], $remove_non_int_items = true ) {

        if ( ! is_array( $list ) ) {
            return $list;
        }

        foreach( $list as $key => $value ) {

            $list[ $key ] = 0;

            if ( is_numeric( $value ) ) {
                $list[ $key ] = (int) $value;
            }

            if ( ! is_numeric( $value ) && $remove_non_int_items ) {
                unset( $list[ $key ] );
            }

        }

        return array_values( $list );
    }

    /**
     * Get Formatted Time
     * 
     * @param $time
     * @param $timezone
     */
    protected function get_formatted_time( $time, $timezone ) {
        $timezone  = $timezone ? $timezone : wp_timezone_string();
        $timezone  = new \DateTimeZone( $timezone );
        $timestamp = strtotime( $time );

        return wp_date( 'j M y @ G:i', $timestamp, $timezone );
    }

}
