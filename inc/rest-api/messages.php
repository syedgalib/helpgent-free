<?php
/**
 * @author  wpWax
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
						'timezone'    => array(
							'default'           => '',
							'sanitize_callback' => 'sanitize_text_field',
						),
						'page'        => array(
							'default'           => 1,
							'validate_callback' => array( $this, 'validate_int' ),
						),
						'read_status' => array(
							'default'           => 'all',
							'validate_callback' => array( $this, 'validate_read_status' ),
						),
						'order'       => array(
							'default'           => 'latest',
							'validate_callback' => array( $this, 'validate_order' ),
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'create_item' ),
					'permission_callback' => array( $this, 'check_user_permission' ),
					'args'                => array(
						'name'          => array(
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						),
						'email'         => array(
							'required'          => true,
							'validate_callback' => array( $this, 'validate_email' ),
							'sanitize_email'    => 'sanitize_text_field',
						),
						'message_type'  => array(
							'required'          => true,
							'validate_callback' => array( $this, 'validate_message_type' ),
						),
						'message_value' => array(
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
					'permission_callback' => array( $this, 'check_user_permission' ),
					'args'                => array(
						'timezone' => array(
							'default'           => '',
							'sanitize_callback' => 'sanitize_text_field',
						),
					),
				),
				array(
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'update_item' ),
					'permission_callback' => array( $this, 'check_user_permission' ),
					'args'                => array(
						'message_by'    => array(
							'required'          => true,
							'validate_callback' => array( $this, 'validate_message_by' ),
						),
						'message_type'  => array(
							'required'          => true,
							'validate_callback' => array( $this, 'validate_message_type' ),
						),
						'message_value' => array(
							'required'          => true,
							'sanitize_callback' => 'sanitize_textarea_field',
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

	public function validate_message_type( $value ) {
		return in_array( $value, array( 'text', 'video', 'audio' ) );
	}

	public function validate_message_by( $value ) {
		return in_array( $value, array( 'user', 'admin' ) );
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

		$rest_data = array_map(
			function( $item ) use ( $args ) {
				$result = array(
					'message_id'      => esc_html( $item['message_id'] ),
					'name'            => esc_html( $item['name'] ),
					'updated_time'    => esc_html( $this->get_formatted_time( $item['updated_time'], $args['timezone'] ) ),
					'last_message_by' => esc_html( $item['last_message_by'] ),
					'is_read'         => esc_html( $item['is_read'] ),
				);
				return $result;
			},
			$data
		);

		return $this->response( true, $rest_data );
	}

	public function get_item( $request ) {
		$args = $request->get_params();
		$data = DB::get_message( $args['message_id'] );

		if ( $data ) {
			$success = true;

			$rest_data = array(
				'message_id'           => esc_html( $data['message_id'] ),
				'name'                 => esc_html( $data['name'] ),
				'avatar'               => esc_url( get_avatar_url( $data['email'] ) ),
				'last_message_by'      => esc_html( $data['last_message_by'] ),
				'last_message_time'    => esc_html( $this->get_formatted_time( $data['updated_time'], $args['timezone'] ) ),
				'last_message_is_read' => esc_html( $data['is_read'] ),
			);

			$rest_data['messages'] = array_map(
				function( $item ) use ( $args ) {
					$result = array(
						'by'    => esc_html( $item['by'] ),
						'time'  => esc_html( $this->get_formatted_time( $item['time'], $args['timezone'] ) ),
						'type'  => esc_html( $item['type'] ),
						'value' => esc_html( $item['value'] ),
					);
					return $result;
				},
				$data['messages']
			);
		} else {
			$success   = false;
			$rest_data = array();
		}

		return $this->response( $success, $rest_data );
	}

	public function create_item( $request ) {
		$args    = $request->get_params();
		$data    = DB::create_message( $args );
		$success = $data ? true : false;
		return $this->response( $success, $data );
	}

	public function update_item( $request ) {
		$args      = $request->get_params();
		$operation = DB::update_message( $args );
		$success   = ( $operation === false ) ? false : true;
		return $this->response( $success );
	}

	public function delete_item( $request ) {
		$args      = $request->get_params();
		$operation = DB::delete_message( $args['message_id'] );
		$success   = $operation ? true : false;
		return $this->response( $success );
	}

	private function get_formatted_time( $time, $timezone ) {
		$timezone  = $timezone ? $timezone : wp_timezone_string();
		$timezone  = new \DateTimeZone( $timezone );
		$timestamp = strtotime( $time );
		return wp_date( 'j M y @ G:i', $timestamp, $timezone );
	}
}
