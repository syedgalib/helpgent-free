<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Rest_API\Version_1;

use \WP_Error;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Conversation_Term_Relationship_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Conversation_Model;
use WPWaxCustomerSupportApp\Base\Helper;

class Conversations extends Rest_Base
{

	/**
	 * Rest Base
	 *
	 * @var string
	 */
	public $rest_base = 'conversations';

	public function register_routes()
	{
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_items' ],
					'permission_callback' => [ $this, 'check_auth_permission' ],
					'args'                => [
						'timezone'    => [
                            'default'           => '',
                            'sanitize_callback' => [ $this, 'sanitize_timezone_string' ],
                        ],
						'page'        => [
							'default'           => 1,
							'validate_callback' => [ $this, 'validate_int' ],
						],
						'order_by'       => [
							'default'           => 'latest',
							'validate_callback' => [ $this, 'validate_order' ],
						],
					],
				],
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'create_item' ],
					'permission_callback' => [ $this, 'check_guest_permission' ],
					'args'                => [
						'timezone'    => [
                            'default'           => '',
                            'sanitize_callback' => [ $this, 'sanitize_timezone_string' ],
                        ],
						'page'        => [
							'default'           => 1,
							'validate_callback' => [ $this, 'validate_int' ],
						],
						'order_by'       => [
							'default'           => 'latest',
							'validate_callback' => [ $this, 'validate_order' ],
						],
					],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)',
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_item' ],
					'permission_callback' => [ $this, 'check_auth_permission' ],
					'args'                => [
						'timezone'    => [
                            'default'           => '',
                            'sanitize_callback' => [ $this, 'sanitize_timezone_string' ],
                        ],
					],
				],
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'update_item' ],
					'permission_callback' => [ $this, 'check_auth_permission' ],
				],
				[
					'methods'             => \WP_REST_Server::DELETABLE,
					'callback'            => [ $this, 'delete_item' ],
					'permission_callback' => [ $this, 'check_auth_permission' ],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/mark-as-read',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [$this, 'mark_as_read'],
					'permission_callback' => [$this, 'check_auth_permission'],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/mark-as-unread',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [$this, 'mark_as_unread'],
					'permission_callback' => [$this, 'check_auth_permission'],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/update-terms',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [$this, 'update_terms'],
					'permission_callback' => [$this, 'check_admin_permission'],
					'args'                => [
						'add_term_ids' => [
							'required'          => false,
							'sanitize_callback' => 'sanitize_text_field',
						],
						'remove_term_ids' => [
							'required'          => false,
							'sanitize_callback' => 'sanitize_text_field',
						],
					],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/add-terms',
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => [$this, 'add_terms'],
					'permission_callback' => [$this, 'check_admin_permission'],
					'args'                => [
						'terms' => [
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
					],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/remove-terms',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [$this, 'remove_terms'],
					'permission_callback' => [$this, 'check_admin_permission'],
					'args'                => [
						'terms' => [
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
					],
				],
			]
		);
	}

	/**
	 * Validate Message Type
	 *
	 * @param $value
	 */
	public function validate_message_type($value)
	{
		return in_array($value, ['text', 'video', 'audio']);
	}

	/**
	 * Validate Order
	 *
	 * @param $value
	 */
	public function validate_order($value)
	{
		return in_array($value, ['latest', 'oldest', 'read', 'unread']);
	}

	/**
	 * Get Items
	 *
	 * @param $request
	 * @return mixed
	 */
	public function get_items($request, $send_rest_response = true)
	{
		$args = $request->get_params();

		$where = [];

		$where['id']         = '';
		$where['terms']   = '';
		$where['updated_at'] = '';
		$where['created_at'] = '';
		$where['created_by'] = '';
		$where['status']     = '';

		$where = Helper\filter_params($where, $args);

		$default = [];

		$default['search']   = '';
		$default['page']     = 1;
		$default['limit']    = 20;
		$default['order_by'] = 'latest';
		$default['timezone'] = '';

		$args = Helper\filter_params($default, $args);

		// Adjust Timezone
		if ( ! empty( $args['timezone'] ) ) {
			$date_time_fields = [ 'created_at', 'updated_at' ];
			$timezone         = $args['timezone'];

			foreach ( $date_time_fields as $field_key ) {
				if ( empty( $where[ $field_key ] ) ) {
					continue;
				}

				$where[ $field_key ] = Helper\convert_to_db_timezone( $where[ $field_key ], $timezone );
			}
		}

		$timezone = $args['timezone'];

		$args['where'] = $where;

		// Validate Capability
		if ( ! Helper\is_current_user_admin() ) {
			$args['where']['created_by'] = Helper\get_current_user_email();
		}

		if ( ! empty( $args['search'] ) ) {
			$users = Helper\search_users( $args['search'], ['email'] );

			if ( ! empty( $users ) ) {
				$users = array_map(function ($user) {
					return $user['email'];
				}, $users);

				$users_emails = trim( join( ',', $users ) );

				$messages = Message_Model::get_items([
					'where' => [
						'user_email' => [
							'key'     => 'user_email',
							'compare' => 'in',
							'value'   => $users_emails,
						]
					],
					'group_by' => 'conversation_id'
				]);

				$conversation_ids = array_map( function( $item ) { $item['conversation_id']; }, $messages );
				$conversation_ids = trim( join( ',', $conversation_ids ), ',' );

				$args['where']['id'] = [
					'field'   => 'id',
					'compare' => 'IN',
					'value'   => "( $conversation_ids )",
				];
			} else {
				$args['where']['id'] = 0;
			}
		}

		if ( ! empty( $args['where']['terms'] ) ) {

			$args['where']['tax_query'] = [
				[
					'taxonomy' => 'tag',
					'field'    => 'term_id',
					'terms'    => $args['where']['terms'],
				]
			];

			unset( $args['where']['terms'] );
		}

		$conversation_data = Conversation_Model::get_items( $args );

		if ( empty( $conversation_data ) ) {
			return ( $send_rest_response ) ? $this->response( true, [] ) : [];
		}

		// Add Additional Session Data
		foreach ( $conversation_data as $conversation_key => $conversation ) {
			// Created At
			if ( ! empty( $conversation_data[ $conversation_key ]['created_at'] ) ) {
				$created_at = $conversation_data[ $conversation_key ]['created_at'];
				$conversation_data[ $conversation_key ]['created_at'] = Helper\get_formatted_time( $created_at, $timezone, 'Y-m-d H:i:s' );
				$conversation_data[ $conversation_key ]['created_at_formatted'] = Helper\get_formatted_time( $created_at, $timezone );
			}

			// Updated At
			if ( ! empty( $conversation_data[ $conversation_key ]['updated_at'] ) ) {
				$updated_at = $conversation_data[ $conversation_key ]['updated_at'];
				$conversation_data[ $conversation_key ]['updated_at'] = Helper\get_formatted_time( $updated_at, $timezone, 'Y-m-d H:i:s' );
				$conversation_data[ $conversation_key ]['updated_at_formatted'] = Helper\get_formatted_time( $updated_at, $timezone );
			}

			// Get First Message
			$first_message_id   = Conversation_Model::get_meta( $conversation['id'], 'first_message_id' );
			$first_message_data = self::get_message_by_id( $first_message_id );
			$conversation_data[ $conversation_key ]['first_message'] = $first_message_data;

			// Get Last Message
			$last_message_id   = Conversation_Model::get_meta( $conversation['id'], 'last_message_id' );
			$last_message_data = self::get_message_by_id( $last_message_id );
			$conversation_data[ $conversation_key ]['last_message']  = $last_message_data;

			// Read Status
			$is_read = Conversation_Model::get_meta( $conversation['id'], 'read' );
			$conversation_data[ $conversation_key ]['read'] = Helper\is_truthy( $is_read );

		}

		if ( $send_rest_response ) {
			return $this->response( true, $conversation_data );
		}

		return $conversation_data;
	}

	public function get_message_by_id( $message_id, $timezone = '' ) {
		$message = ( ! empty( $message_id ) ) ? Message_Model::get_item( $message_id ) : null;

		if ( is_wp_error( $message ) || empty( $message ) ) {
			return null;
		}

		$message['user'] = Helper\get_users_data_by( 'email', [ $message['user'] ] );

		if ( ! empty( $message['created_at'] ) ) {
			$message['created_at']           = Helper\get_formatted_time( $message['created_at'], $timezone, 'Y-m-d h:m:s' );
			$message['created_at_formatted'] = Helper\get_formatted_time( $message['created_at'], $timezone );
		}

		if ( ! empty( $message['updated_at'] ) ) {
			$message['updated_at']           = Helper\get_formatted_time( $message['updated_at'], $timezone, 'Y-m-d h:m:s' );
			$message['updated_at_formatted'] = Helper\get_formatted_time( $message['updated_at'], $timezone );
		}


		return $message;
	}

	/**
	 * Create Item
	 *
	 * @param $request
	 * @return mixed
	 */
	public function create_item( $request )
	{
		$args = $request->get_params();
		$args['created_by'] = ! empty( $args['created_by'] ) ? $args['created_by'] : Helper\get_current_user_email();

		$args = apply_filters( 'helpgent_conversation_insert_args', $args );

		/**
         * Fires before creating an item
		 *
         * @since 1.0
         */
        do_action( 'helpgent_before_conversation_insert', $args );

        $data = Conversation_Model::create_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

		/**
         * Fires after creating an item
		 *
         * @since 1.0
         */
        do_action( 'helpgent_after_conversation_insert', $data, $args );

        $data    = $this->prepare_item_for_response( $data, $args );
        $success = true;

        return $this->response($success, $data);
	}

	/**
	 * Update Item
	 *
	 * @param $request
	 * @return mixed
	 */
	public function update_item( $request )
	{
		// Validate Capability
		if ( ! Helper\is_current_user_admin() ) {
			return new WP_Error( 403, __( 'You are not allowed to delete the resource.', 'wpwax-customer-support-app' ) );
		}

		$args = $request->get_params();
		$args = apply_filters( 'helpgent_conversation_update_args', $args );

		/**
         * Fires before updating an item
		 *
         * @since 1.0
         */
        do_action( 'helpgent_before_conversation_update', $args );

        $data = Conversation_Model::update_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

		/**
         * Fires after updating an item
		 *
         * @since 1.0
         */
        do_action( 'helpgent_after_conversation_update', $data, $args );

        $data    = $this->prepare_item_for_response( $data, $args );
        $success = true;

        return $this->response( $success, $data );
	}

	/**
	 * Get users by session ID
	 *
	 * @param string $conversation_id
	 *
	 * @return array Users
	 */
	public function get_users_by_conversation_id( $conversation_id )
	{
		$args = [];

		$where = [];
		$where['conversation_id'] = $conversation_id;
		$args['where'] = $where;

		$args['limit']    = -1;
		$args['group_by'] = 'user_email';

		$messages = Message_Model::get_items( $args );

		if ( empty( $messages ) ) {
			return [];
		}

		$users_emails = array_map( function ($message) {
			return $message['user_email'];
		}, $messages );

		return Helper\get_users_data_by( 'email', $users_emails );
	}

	/**
	 * Get Item
	 *
	 * @param $request
	 * @return mixed
	 */
	public function get_item( $request )
	{
		$request->set_param( 'limit', 1 );
		$request->set_param( 'id', $request->get_param('id') );

		// Validate Capability
		if ( ! $this->can_current_user_view_conversation(  $request->get_param('id') ) ) {
			return new WP_Error( 403, __( 'You are not allowed to view the resource.', 'wpwax-customer-support-app' ) );
		}

		$conversation_data = $this->get_items( $request, false );

		if ( is_wp_error( $conversation_data) ) {
			return $conversation_data;
		}

		$conversation_data = ! empty( $conversation_data ) && is_array( $conversation_data ) ? $conversation_data[0] : null;

		return $this->response( true, $conversation_data );
	}

	/**
	 * Delete Item
	 *
	 * @param $request
	 * @return mixed
	 */
	public function delete_item( $request )
	{
		$args = $request->get_params();
		$conversation_id = ( ! empty( $args['id'] ) ) ? $args['id'] : 0;

		$conversation = Conversation_Model::get_item( $conversation_id );

		if ( is_wp_error( $conversation ) ) {
			return $conversation;
		}

		// Validate Capability
		if ( ! $this->can_current_user_edit_conversation() ) {
			return new WP_Error( 403, __( 'You are not allowed to delete the resource.' ) );
		}

		// Delete Messages
		$where         = [ 'conversation_id' => $conversation_id ];
		$messages_args = [ 'limit' => -1, 'where' => $where ];

		$messages = Message_Model::get_items( $messages_args );

		foreach( $messages as $message ) {
			Message_Model::delete_item( $message['id'] );
		}

		// Delete Terms
		Conversation_Term_Relationship_Model::delete_item_where( $where );

		//  Delete Conversation Meta
		Conversation_Model::delete_meta( $conversation_id );

		// Delete Conversation
		$delete_conversation = Conversation_Model::delete_item( $conversation_id );

		if ( is_wp_error( $delete_conversation ) ) {
			return $delete_conversation;
		}

		return $this->response( true );
	}

	/**
	 * Update Terms
	 *
	 * @param $request
	 * @return array Response
	 */
	public function update_terms( $request )
	{
		$args = $request->get_params();

		$default = [];

		$default['id']           = '';
		$default['add_terms']    = '';
		$default['remove_terms'] = '';

		$args = Helper\merge_params( $default, $args );

		if ( empty( $args['id'] ) ) {
			$message = __('The conversation ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$conversation_exists = $this->is_conversation_exists( $args['id'] );

		if ( is_wp_error( $conversation_exists ) ) {
			return $conversation_exists;
		}

		// Validate Capability
		if ( ! $this->can_current_user_edit_conversation() ) {
			return new WP_Error( 403, __( 'You are not allowed to perform this operation.' ) );
		}

		$add_terms    = ( ! empty( $args['add_terms'] ) ) ? Helper\convert_string_to_int_array( $args['add_terms'] ) : [];
		$remove_terms = ( ! empty( $args['remove_terms'] ) ) ? Helper\convert_string_to_int_array( $args['remove_terms'] ) : [];

		if ( empty( $add_terms ) && empty( $remove_terms ) ) {
			$message = __('Nothing to add or remove.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		// Add Terms
		if ( ! empty( $add_terms ) ) {
			Conversation_Model::add_terms( $args['id'], $add_terms );
		}

		// Remove Terms
		if ( ! empty( $remove_terms ) ) {
			Conversation_Model::remove_terms( $args['id'], $remove_terms );
		}

		$terms = Conversation_Model::get_terms( $args['id'] );

		return $this->response( true, $terms );
	}

	/**
	 * Add Terms
	 *
	 * @param $request
	 * @return array Response
	 */
	public function add_terms( $request )
	{
		$args = $request->get_params();

		$default = [];

		$default['id'] = '';
		$default['terms']           = '';

		$args = Helper\merge_params($default, $args);

		if ( empty( $args['id'] ) ) {
			$message = __('The conversation ID is required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		$conversation_exists = $this->is_conversation_exists( $args['id'] );

		if ( is_wp_error( $conversation_exists ) ) {
			return $conversation_exists;
		}

		// Validate Capability
		if ( ! $this->can_current_user_edit_conversation() ) {
			return new WP_Error( 403, __( 'You are not allowed to perform this operation.' ) );
		}

		if ( empty( $args['terms'] ) ) {
			$message = __('The term IDs are required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		$terms = Helper\convert_string_to_int_array( $args['terms'] );

		if ( empty( $terms ) ) {
			$message = __('The term IDs are required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		Conversation_Model::add_terms( $args['id'], $terms );

		$terms = Conversation_Model::get_terms( $args['id'] );

		return $this->response( true, $terms);
	}

	/**
	 * Remove Terms
	 *
	 * @param $request
	 * @return array Response
	 */
	public function remove_terms( $request )
	{
		$args = $request->get_params();

		$default = [];

		$default['id']    = '';
		$default['terms'] = '';

		$args = Helper\merge_params($default, $args);

		if ( empty( $args['id'] ) ) {
			$message = __('The conversation ID is required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		$conversation_exists = $this->is_conversation_exists( $args['id'] );

		if ( is_wp_error( $conversation_exists ) ) {
			return $conversation_exists;
		}

		// Validate Capability
		if ( ! $this->can_current_user_edit_conversation() ) {
			return new WP_Error( 403, __( 'You are not allowed to perform this operation.' ) );
		}

		if ( empty( $args['terms'] ) ) {
			$message = __('The term IDs are required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		$terms = Helper\convert_string_to_int_array( $args['terms'] );

		if ( empty( $terms ) ) {
			$message = __('The term IDs are required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		Conversation_Model::remove_terms( $args['id'], $terms );

		$terms = Conversation_Model::get_terms( $args['id'] );

		return $this->response( true, $terms);
	}

	/**
	 * Mark as Read
	 *
	 * @param $request
	 * @return mixed
	 */
	public function mark_as_read( $request )
	{
		$args            = $request->get_params();
		$conversation_id = $args['id'];

		$session_exists = $this->is_conversation_exists( $conversation_id );

		if ( is_wp_error( $session_exists ) ) {
			return $session_exists;
		}

		// Validate Capability
		if ( ! $this->can_current_user_edit_conversation() ) {
			return new WP_Error( 403, __( 'You are not allowed to perform this operation.' ) );
		}

		// Mark as Read
		Conversation_Model::update_meta( $conversation_id, 'read', 1 );

		return $this->response( true );
	}

	/**
	 * Mark as Unread
	 *
	 * @param $request
	 * @return mixed
	 */
	public function mark_as_unread( $request )
	{
		$args            = $request->get_params();
		$conversation_id = $args['id'];

		$session_exists = $this->is_conversation_exists( $conversation_id );

		if ( is_wp_error( $session_exists ) ) {
			return $session_exists;
		}

		// Validate Capability
		if ( ! $this->can_current_user_edit_conversation() ) {
			return new WP_Error( 403, __( 'You are not allowed to perform this operation.' ) );
		}

		// Mark as Read
		Conversation_Model::update_meta( $conversation_id, 'read', 0 );

		return $this->response( true );
	}

	/**
	 * Can Current User View Session
	 *
	 * @param string $conversation_id
	 * @return bool
	 */
	public function can_current_user_view_conversation( $conversation_id ) {

		if ( Helper\is_current_user_admin() ) {
			return true;
		}

		$conversation = Conversation_Model::get_item( $conversation_id );

		if ( is_wp_error( $conversation ) ) {
			return false;
		}

		return $conversation['created_by'] === Helper\get_current_user_email();
	}

	/**
	 * Can Current User Edit Session
	 *
	 * @return bool Status
	 */
	public function can_current_user_edit_conversation() {
		return Helper\is_current_user_admin();
	}

	/**
	 * Is conversation exists
	 *
	 * @param string $conversation_id
	 * @return bool|WP_Error
	 */
	public function is_conversation_exists( $conversation_id = 0 )
	{
		$conversation = Conversation_Model::get_item( $conversation_id );

		if ( is_wp_error( $conversation ) ) {
			$message = __('The conversation does not exist.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		return true;
	}
}
