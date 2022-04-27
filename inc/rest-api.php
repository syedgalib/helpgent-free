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
				'methods'  => \WP_REST_Server::EDITABLE,
				'callback' => array( __CLASS__, 'create_new_form' ),
				'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
				'args'     => array(
					'name' => array(
						'required' => true,
						'sanitize_callback' => 'sanitize_text_field',
					),
					'options' => array(
						'default' => '',
					),
				),
			)
		);

		register_rest_route(
			self::$namespace,
			'get_forms',
			array(
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( __CLASS__, 'get_all_forms' ),
				'permission_callback' => array( __CLASS__, 'check_admin_permission' ),
			)
		);

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

		$show_errors_status = $wpdb->show_errors;
		$wpdb->show_errors  = false;

		$args = $request->get_params();
		// var_dump($args);
		return true;

		$table = $wpdb->prefix . 'vm_forms';
		$data  = array(
			'name'    => $args['name'],
			'options' => $args['options'],
		);

		$result            = $wpdb->insert( $table, $data );
		$wpdb->show_errors = $show_errors_status;

		return $result ? $wpdb->insert_id : false;
	}

	public static function get_all_forms( \WP_REST_Request $request ) {
		global $wpdb;
		$table = $wpdb->prefix . 'vm_forms';
		$query = $wpdb->prepare( "SELECT form_id, name FROM $table", array() );
		// var_dump( $request->get_params() );

		$show_errors_status = $wpdb->show_errors;
		$wpdb->show_errors  = false;

		$results = $wpdb->get_results( $query );

		$wpdb->show_errors = $show_errors_status;

		return rest_ensure_response( $results );
	}

}
