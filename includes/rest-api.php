<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Rest_API {

	public $namespace = 'wpwax-vm/v1';

	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * API Ref: https://gist.github.com/kowsar89/56e857d85ad0ceb595828fdb4a5a05e5
	 */
	public function register_routes() {
		$rest_base = 'forms';

		register_rest_route(
			$this->namespace,
			'/' . $rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_items' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
					'args'                => array(
						'page' => array(
							'default'           => 1,
							'validate_callback' => array( $this, 'validate_int' ),
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'create_item' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
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
			$this->namespace,
			'/' . $rest_base . '/(?P<form_id>[\d]+)',
			array(
				'args' => array(
					'form_id' => array(
						'type' => 'integer',
					),
				),
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_item' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
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
					'callback'            => array( $this, 'delete_item' ),
					'permission_callback' => array( $this, 'check_admin_permission' ),
				),
			)
		);

	}

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

	public function get_items( $request ) {
		$args = $request->get_params();
		$data = DB::get_forms( $args['page'] );
		return $this->response( true, $data );
	}

	public function get_item( $request ) {
		$args    = $request->get_params();
		$data    = DB::get_form( $args['form_id'] );
		$success = $data ? true : false;
		return $this->response( $success, $data );
	}

	public function create_item( $request ) {
		$args    = $request->get_params();
		$data    = DB::create_form( $args );
		$success = $data ? true : false;
		return $this->response( $success, $data );
	}

	public function update_item( $request ) {
		$args      = $request->get_params();
		$operation = DB::update_form( $args );
		$success   = ( $operation === false ) ? false : true;
		return $this->response( $success );
	}

	public function delete_item( $request ) {
		$args      = $request->get_params();
		$operation = DB::delete_form( $args['form_id'] );
		$success   = $operation ? true : false;
		return $this->response( $success );
	}
}
