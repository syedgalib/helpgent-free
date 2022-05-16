<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm\rest_api;

use wpWax\vm\db\DB;

class Messages extends Base {

	public function __construct() {
		$this->rest_base = 'messages';
		parent::__construct();
	}

	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
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
						'read_status' => array(
							'default'           => 'all',
							'validate_callback' => array( $this, 'validate_read_status' ),
						),
						'order' => array(
							'default'           => 'latest',
							'validate_callback' => array( $this, 'validate_order' ),
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
						'email'    => array(
							'required'          => true,
							'validate_callback' => array( $this, 'validate_email' ),
							'sanitize_email' => 'sanitize_text_field',
						),
						'message_type' => array(
							'required'          => true,
							'validate_callback' => array( $this, 'validate_message_type' ),
						),
						'message_data' => array(
							'required'          => true,
							'sanitize_callback' => 'sanitize_textarea_field',
						),
					),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<message_id>[\d]+)',
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
				// array(
				// 	'methods'             => \WP_REST_Server::EDITABLE,
				// 	'callback'            => array( $this, 'update_item' ),
				// 	'permission_callback' => array( $this, 'check_admin_permission' ),
				// 	'args'                => array(
				// 		'name'    => array(
				// 			'default'           => '',
				// 			'sanitize_callback' => 'sanitize_text_field',
				// 		),
				// 		'options' => array(
				// 			'default'           => '',
				// 			'sanitize_callback' => 'sanitize_text_field',
				// 		),
				// 	),
				// ),
				// array(
				// 	'methods'             => \WP_REST_Server::DELETABLE,
				// 	'callback'            => array( $this, 'delete_item' ),
				// 	'permission_callback' => array( $this, 'check_admin_permission' ),
				// ),
			)
		);

	}

	public function validate_message_type( $value ) {
		return in_array( $value, array( 'text', 'video', 'audio' ) );
	}

	public function validate_read_status( $value ) {
		return in_array( $value, array( 'all', 'read', 'unread' ) );
	}

	public function validate_order( $value ) {
		return in_array( $value, array( 'latest', 'oldest' ) );
	}

	public function get_items( $request ) {
		$args = $request->get_params();
		$data = DB::get_messages( $args );
		return $this->response( true, $data );
	}

	public function get_item( $request ) {
		$args    = $request->get_params();
		$data    = DB::get_message( $args['message_id'] );
		$success = $data ? true : false;
		return $this->response( $success, $data );
	}

	public function create_item( $request ) {
		$args    = $request->get_params();
		$data    = DB::create_message( $args );
		$success = $data ? true : false;
		return $this->response( $success, $data );
	}

	// public function update_item( $request ) {
	// 	$args      = $request->get_params();
	// 	$operation = DB::update_form( $args );
	// 	$success   = ( $operation === false ) ? false : true;
	// 	return $this->response( $success );
	// }

	// public function delete_item( $request ) {
	// 	$args      = $request->get_params();
	// 	$operation = DB::delete_form( $args['form_id'] );
	// 	$success   = $operation ? true : false;
	// 	return $this->response( $success );
	// }
}
