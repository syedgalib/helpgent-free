<?php
/**
 * API Ref: https://gist.github.com/kowsar89/56e857d85ad0ceb595828fdb4a5a05e5
 *
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm\Rest_API;

abstract class Base {

	public $namespace = 'wpwax-vm/v1';
	public $rest_base;

	public function __construct( $rest_base ) {
		$this->namespace = 'wpwax-vm/v1';
		$this->rest_base = $rest_base;

		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	abstract public function register_routes();

	public function sanitize_int( $value ) {
		return intval( $value );
	}

	public function validate_int( $value ) {
		return is_numeric( $value ) ? true : false;
	}

	public function response( $is_success, $data = '' ) {
		$response = array(
			'success' => $is_success,
			'message' => $is_success ? __( 'Operation Successful', 'wpwaxvm' ) : __( 'Operation Failed', 'wpwaxvm' ),
			'data'    => $is_success ? $data : '',
		);

		return rest_ensure_response( $response );
	}

	public function check_admin_permission() {
		return true; // @todo remove this later
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new \WP_Error(
				'admin_check_failed',
				__( 'You are not allowed to perform this operation.' ),
				array( 'status' => rest_authorization_required_code() )
			);
		}

		return true;
	}
}