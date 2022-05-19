<?php
/**
 * API Ref: https://gist.github.com/kowsar89/56e857d85ad0ceb595828fdb4a5a05e5
 *
 * @author  wpWax
 */

namespace wpWax\vm\rest_api;

abstract class Base {

	public $namespace = 'wpwax-vm/v1';
	public $rest_base;

	public function __construct() {
		$this->namespace = 'wpwax-vm/v1';

		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	abstract public function register_routes();

	public function validate_int( $value ) {
		return is_numeric( $value );
	}

	public function validate_email( $value ) {
		return is_email( $value );
	}

	public function sanitize_int( $value ) {
		return intval( $value );
	}

	public function response( $is_success, $data = '' ) {
		$response = array(
			'success' => $is_success,
			'message' => $is_success ? __( 'Operation Successful', 'wpwaxvm' ) : __( 'Operation Failed', 'wpwaxvm' ),
			'data'    => $is_success ? $data : '',
		);

		return rest_ensure_response( $response );
	}

	public function error_nonce_missing() {
		return new \WP_Error(
			'nonce_missing',
			__( 'Header:X-WP-Nonce is missing' ),
			array( 'status' => rest_authorization_required_code() )
		);
	}

	public function error_admin_check_failed() {
		return new \WP_Error(
			'admin_check_failed',
			__( 'You are not allowed to perform this operation.' ),
			array( 'status' => rest_authorization_required_code() )
		);
	}

	public function check_user_permission( $request ) {
		return true; // @todo remove this later

		if ( ! $request->get_header( 'X-WP-Nonce' ) ) {
			return $this->error_nonce_missing();
		}

		return true;
	}

	public function check_admin_permission( $request ) {
		return true; // @todo remove this later

		if ( ! $request->get_header( 'X-WP-Nonce' ) ) {
			return $this->error_nonce_missing();
		}

		if ( ! current_user_can( 'edit_posts' ) ) {
			return $this->error_admin_check_failed();
		}

		return true;
	}
}
