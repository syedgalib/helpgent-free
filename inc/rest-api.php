<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Rest_API {

	public static $namespace = 'wpwax-vm/v1';

	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'register_routes_forms' ) );
	}

	/**
	 * API Ref: https://gist.github.com/kowsar89/56e857d85ad0ceb595828fdb4a5a05e5
	 */
	public static function register_routes_forms() {
		$rest_base = 'forms';

		register_rest_route(
			self::$namespace,
			'/' . $rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( __CLASS__, 'get_items' ),
					'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
					'args'                => array(
						'page' => array(
							'default'           => 1,
							'validate_callback' => array( __CLASS__, 'validate_int' ),
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( __CLASS__, 'create_item' ),
					'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
					'args'                => array(
						'name'    => array(
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'options' => array(
							'default'           => '',
							'sanitize_callback' => 'sanitize_text_field',
						),
					),
				),
			)
		);

		register_rest_route(
			self::$namespace,
			'/' . $rest_base . '/(?P<form_id>[\d]+)',
			array(
				'args' => array(
					'form_id' => array(
						'type' => 'integer',
					),
				),
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( __CLASS__, 'get_item' ),
					'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( __CLASS__, 'update_item' ),
					'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
					'args'                => array(
						'name'    => array(
							'default'           => '',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'options' => array(
							'default'           => '',
							'sanitize_callback' => 'sanitize_text_field',
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::DELETABLE,
					'callback'            => array( __CLASS__, 'delete_item' ),
					'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
				),
			)
		);

	}

	public static function sanitize_int( $value ) {
		return intval( $value );
	}

	public static function validate_int( $value ) {
		return is_numeric( $value ) ? true : false;
	}

	public static function response( $is_success, $data = '' ) {
		$response = array(
			'success' => $is_success,
			'message' => $is_success ? __( 'Operation Successful', 'wpwaxvm' ) : __( 'Operation Failed', 'wpwaxvm' ),
			'data'    => $is_success ? $data : '',
		);

		return rest_ensure_response( $response );
	}

	public static function check_admin_permission() {
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

	public static function get_items( $request ) {
		$args = $request->get_params();
		$data = DB::get_forms( $args['page'] );
		return self::response( true, $data );
	}

	public static function get_item( $request ) {
		$args    = $request->get_params();
		$data    = DB::get_form( $args['form_id'] );
		$success = $data ? true : false;
		return self::response( $success, $data );
	}

	public static function create_item( $request ) {
		$args    = $request->get_params();
		$data    = DB::create_form( $args );
		$success = $data ? true : false;
		return self::response( $success, $data );
	}

	public static function update_item( $request ) {
		$args      = $request->get_params();
		$operation = DB::update_form( $args );
		$success   = ( $operation === false ) ? false : true;
		return self::response( $success );
	}

	public static function delete_item( $request ) {
		$args      = $request->get_params();
		$operation = DB::delete_form( $args['form_id'] );
		$success   = $operation ? true : false;
		return self::response( $success );
	}
}
