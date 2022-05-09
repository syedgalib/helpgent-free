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
		add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );
	}

	/**
	 * API Ref: https://gist.github.com/kowsar89/56e857d85ad0ceb595828fdb4a5a05e5
	 */
	public static function register_routes() {

		register_rest_route(
			self::$namespace,
			'create_form',
			array(
				'methods'             => \WP_REST_Server::EDITABLE,
				'callback'            => array( __CLASS__, 'create_new_form' ),
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
			)
		);

		register_rest_route(
			self::$namespace,
			'delete_form',
			array(
				'methods'             => \WP_REST_Server::DELETABLE,
				'callback'            => array( __CLASS__, 'delete_form' ),
				'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
				'args'                => array(
					'form_id' => array(
						'required'          => true,
						'sanitize_callback' => array( __CLASS__, 'sanitize_int' ),
					),
				),
			)
		);

		register_rest_route(
			self::$namespace,
			'get_form',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'get_form' ),
				'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
				'args'                => array(
					'form_id' => array(
						'required'          => true,
						'sanitize_callback' => array( __CLASS__, 'sanitize_int' ),
					),
				),
			)
		);

		register_rest_route(
			self::$namespace,
			'get_forms',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( __CLASS__, 'get_all_forms' ),
				'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
				'args'                => array(
					'page' => array(
						'default'           => 1,
						'validate_callback' => array( __CLASS__, 'validate_int' ),
					),
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

	public static function create_new_form( $request ) {
		global $wpdb;

		$args = $request->get_params();

		$table = $wpdb->prefix . 'vm_forms';
		$data  = array(
			'name'    => $args['name'],
			'options' => $args['options'],
		);

		$result   = $wpdb->insert( $table, $data );
		$response = $result ? $wpdb->insert_id : false;

		return rest_ensure_response( $response );
	}

	public static function delete_form( $request ) {
		global $wpdb;

		$args = $request->get_params();

		$table = $wpdb->prefix . 'vm_forms';
		$data  = array(
			'form_id' => $args['form_id'],
		);

		$result = $wpdb->delete( $table, $data, array( '%d' ) );
		return rest_ensure_response( $result );
	}

	public static function get_all_forms( $request ) {
		global $wpdb;

		$args   = $request->get_params();
		$limit  = 20;
		$offset = ( $limit * $args['page'] ) - $limit;

		$table = $wpdb->prefix . 'vm_forms';
		$query = $wpdb->prepare( "SELECT form_id, name FROM $table LIMIT %d OFFSET %d", array( $limit, $offset ) );

		$results = $wpdb->get_results( $query );

		return rest_ensure_response( $results );
	}

	public static function get_form( $request ) {
		global $wpdb;

		$args    = $request->get_params();
		$form_id = $args['form_id'];

		$table = $wpdb->prefix . 'vm_forms';
		$query = $wpdb->prepare( "SELECT * FROM $table WHERE form_id = %d", array( $form_id ) );

		$results = $wpdb->get_results( $query );

		return rest_ensure_response( $results );
	}
}
