<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;

use \WP_REST_Server;
use \WP_User_Query;
use \WP_Error;
use \WP_REST_Response;
use WPWaxCustomerSupportApp\Module\Core\Rest_API\Rest_Helper;
use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Core\Model\Auth_Token_Model;
use WPWaxCustomerSupportApp\Module\Core\Model\Guest_User_Model;

class Guest_User extends Rest_Base {

    /**
     * Rest Base
     *
     * @var string
     */
    public $rest_base = 'guest-users';

    public function register_routes() {

        register_rest_route( $this->namespace, '/' . $this->rest_base, array(
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_items' ),
				'permission_callback' => array( $this, 'check_guest_permission' ),
				'args'                => $this->get_collection_params(),
			),
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'create_item' ),
				'permission_callback' => array( $this, 'check_guest_permission' ),
				'args'                => array_merge( $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ), array(
					'email' => array(
						'required' => true,
						'type'     => 'string',
						'description' => __( 'New user email address.', 'wpwax-customer-support-app' ),
					),
					'name' => array(
						'required' => false,
						'description' => __( 'User name.', 'wpwax-customer-support-app' ),
						'type'     => 'string',
					),
				) ),
			),
		) );

		register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<id>[\d]+)', array(
			'args' => array(
				'id' => array(
					'description' => __( 'Unique identifier for the resource.', 'wpwax-customer-support-app' ),
					'type'        => 'integer',
				),
			),
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_item' ),
				'permission_callback' => array( $this, 'check_guest_permission' ),
				'args'                => array(
					'context' => $this->get_context_param( array( 'default' => 'view' ) ),
				),
			),
			array(
				'methods'             => WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'update_item' ),
				'permission_callback' => array( $this, 'check_auth_permission' ),
				'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::EDITABLE ),
			),
			array(
				'methods'             => WP_REST_Server::DELETABLE,
				'callback'            => array( $this, 'delete_item' ),
				'permission_callback' => array( $this, 'check_auth_permission' ),
				'args'                => array(
					'force' => array(
						'default'     => false,
						'type'        => 'boolean',
						'description' => __( 'Required to be true, as resource does not support trashing.', 'wpwax-customer-support-app' ),
					),
					'reassign' => array(
						'default'     => 0,
						'type'        => 'integer',
						'description' => __( 'ID to reassign posts to.', 'wpwax-customer-support-app' ),
					),
				),
			),
		) );

    }

	/**
	 * Get all users.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_items( $request ) {
		$args = $request->get_params();

		$where = [];

        $where['id']         = null;
        $where['email']      = null;
        $where['name']       = null;
        $where['created_at'] = null;

        $where = Helper\filter_params( $where, $args );

		if ( isset( $where['name'] ) ) {
			$where['name'] = [
				'key'     => 'name',
				'compare' => 'LIKE',
				'value'   => $where['name'],
			];
		}

		$args['where'] = $where;

		$users_data = Guest_User_Model::get_items( $args );

		$users = [];

		if ( ! empty( $users_data ) ) {
			foreach( $users_data as $user ) {
				$users[] = $this->prepare_item_for_response( $user, $request );
			}
		}

		return $this->response( true, $users );
	}

	/**
	 * Create a single user.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function create_item( $request ) {
		$args = $request->get_params();

		$user = Guest_User_Model::create_item( $args );

		if ( is_wp_error( $user ) ) {
			return $user;
		}

		Auth_Token_Model::create_token( $user['email'] );

		$user = $this->prepare_item_for_response( $user, $request );

		return $this->response( true, $user );
	}

	/**
	 * Get a single user.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function get_item( $request ) {
		$id = (int) $request['id'];

		$user = Guest_User_Model::get_item( $id );

		if ( is_wp_error( $user ) ) {
			return $user;
		}

		$user = $this->prepare_item_for_response( $user, $request );

		return $this->response( true, $user );
	}

	/**
	 * Update a single user.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function update_item( $request ) {
		$args = $request->get_params();

		$user = Guest_User_Model::update_item( $args );

		if ( is_wp_error( $user  ) ) {
			return $user;
		}

		$user = $this->prepare_item_for_response( $user, $request );

		return $this->response( true, $user );
	}

	/**
	 * Delete a single user.
	 *
	 * @param WP_REST_Request $request Full details about the request.
	 * @return WP_Error|WP_REST_Response
	 */
	public function delete_item( $request ) {
		$id = (int) $request['id'];

		$response = Guest_User_Model::delete_item( $id );

		if ( is_wp_error( $response  ) ) {
			return $response;
		}

		return $this->response( true, $response );
	}

	/**
	 * Prepares a single user output for response.
	 *
	 * @param array $user User array.
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response Response object.
	 */
	public function prepare_item_for_response( $user, $request, $with_data = [] ) {

		$users_metas = Guest_User_Model::get_meta( $user['id'] );

		foreach( $users_metas as $meta ) {

			if ( in_array( $meta['meta_key'], array_keys( $user ) ) ) {
				continue;
			}

			$meta_key = $meta['meta_key'];
			$user[ $meta_key ] = $meta['meta_value'];

		}

		return $user;
	}

}
