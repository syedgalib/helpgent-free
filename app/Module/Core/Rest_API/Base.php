<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API;

use \WP_REST_Controller;

use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Core\Model\Auth_Token_Model;
use WPWaxCustomerSupportApp\Module\Core\Model\Guest_User_Model;

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
	 * Sanitize Timezone String
	 *
     * @param string $value
	 * @return string $value
     */
    public function sanitize_timezone_string( $value ) {
    	return Helper\sanitize_timezone_string( $value );
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
    public function response( $is_success, $data = null, $message = '', $headers = [] ) {

        $default_message = $is_success ? __( 'Operation Successful', 'wpwax-customer-support-app' ) : __( 'Operation Failed', 'wpwax-customer-support-app' );
        $message = ( ! empty( $message ) ) ? $message : $default_message;

        $response = [
            'success'     => $is_success,
            'message'     => $message,
            'data_length' => ( is_array( $data ) ) ? count( $data ) : null,
            'data'        => $data,
        ];

		$response = rest_ensure_response( $response );

		if ( ! empty( $headers ) ) {
			foreach( $headers as $key => $value ) {
				$response->header( $key, $value );
			}
		}

        return $response;
    }

    /**
     * Prepare item for response
     *
	 * @param array $item    WordPress representation of the item.
	 * @param array $request_params Request params.
     *
	 * @return WP_REST_Response|null Response object on success, or null object on failure.
     */
    public function prepare_item_for_response( $item, $request_params ) {

        if ( ! is_array( $item ) || empty( $item ) ) {
            return null;
        }

        $schema = ( ! empty( $request_params['sanitize_schema'] ) ) ? $request_params['sanitize_schema'] : [];
        $item   = Helper\sanitize_list_items( $item, $schema, $request_params );

        return $item;
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

    public function error_auth_check_failed() {
        return new \WP_Error(
            'auth_check_failed',
            __( 'You are not allowed to perform this operation.' ),
            ['status' => rest_authorization_required_code()]
        );
    }

    /**
     * Check guest permission
     *
     * @param $request
     * @return mixed
     */
    public function check_guest_permission( $request ) {

        $skip_permission = apply_filters( 'wpwax_customer_support_app_skip_rest_permission', false );

        if ( $skip_permission ) {
            return true;
        }

        if ( ! $request->get_header( 'X-WP-Nonce' ) ) {
            return $this->error_nonce_missing();
        }

        return true;
    }

    /**
     * Check auth permission
     *
     * @param $request
     * @return mixed
     */
    public function check_auth_permission( $request ) {

        $skip_permission = apply_filters( 'wpwax_customer_support_app_skip_rest_permission', false );

        if ( $skip_permission ) {
            return true;
        }

		$token = $request->get_header( 'Helpgent-Token' );
		$has_valid_token = false;

		if ( ! empty( $token ) ) {
			$has_valid_token = $this->has_valid_token( $token );

			if ( is_wp_error( $has_valid_token ) ) {
				return $has_valid_token;
			}
        }

        if ( ! $has_valid_token && ! $request->get_header( 'X-WP-Nonce' ) ) {
            return $this->error_nonce_missing();
        }

		$is_admin  = Helper\is_current_user_admin();
		$is_client = current_user_can( 'wpwax_vm_client' );
		$is_guest  =  $has_valid_token;

        if ( ! in_array( true, [ $is_admin, $is_client, $is_guest ] ) ) {
            return $this->error_auth_check_failed();
        }

        return true;
    }

    /**
     * Check admin permission
     *
     * @param $request
     * @return mixed
     */
    public function check_admin_permission( $request ) {

        $skip_permission = apply_filters( 'wpwax_customer_support_app_skip_rest_permission', false );

        if ( $skip_permission ) {
            return true;
        }

		$token = $request->get_header( 'Helpgent-Token' );
		$has_valid_token = false;

		if ( ! empty( $token ) ) {
			$has_valid_token = $this->has_valid_token( $token );

			if ( is_wp_error( $has_valid_token ) ) {
				return $has_valid_token;
			}
        }

		if ( ! $has_valid_token && ! $request->get_header( 'X-WP-Nonce' ) ) {
            return $this->error_nonce_missing();
        }

		if ( ! Helper\is_current_user_admin() ) {
            return $this->error_admin_check_failed();
        }

        return true;
    }

	/**
	 * Check if has valid token
	 *
	 * @param string $token
	 * @return bool|WP_Error Status
	 */
	public function has_valid_token( $token = '' ) {
		$email = Auth_Token_Model::get_user_email_by_token( $token );

		if ( empty( $email ) ) {
			return new \WP_Error(
				'auth_check_failed',
				__( 'You are not allowed to perform this operation.' ),
				[ 'status' => rest_authorization_required_code() ]
			);
		}

		$has_valid_token = Auth_Token_Model::has_valid_token( $email, $token );

		if ( ! $has_valid_token ) {
			return new \WP_Error(
				'auth_check_failed',
				__( 'You are not allowed to perform this operation.' ),
				[ 'status' => rest_authorization_required_code() ]
			);
		}

		$wp_user = get_user_by( 'email', $email );

		if ( ! empty( $wp_user ) ) {
			$GLOBALS['current_user'] = $wp_user;
		} else {
			$GLOBALS['helpgent_guest_user'] = $email;
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
	 * Check if user is admin
	 *
	 * @param WP_User $user
	 * @return bool
	 */
	protected function is_user_admin( $user ) {
		return Helper\is_user_admin( $user );
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

        return wp_date( 'j M, y @g:i a', $timestamp, $timezone );
    }

}
