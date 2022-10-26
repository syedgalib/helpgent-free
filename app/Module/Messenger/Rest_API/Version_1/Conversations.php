<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Rest_API\Version_1;

use \WP_Error;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Conversation_Term_Relationship_Model;
use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Core\Model\Term_Model;
use WPWaxCustomerSupportApp\Module\Core\Model\Attachment_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Conversation_Model;

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
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)',
			[
				[
					'methods'             => \WP_REST_Server::DELETABLE,
					'callback'            => [$this, 'delete_item'],
					'permission_callback' => [$this, 'check_auth_permission'],
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
			'/' . $this->rest_base . '/add-terms',
			[
				[
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => [$this, 'add_terms'],
					'permission_callback' => [$this, 'check_admin_permission'],
					'args'                => [
						'conversation_id' => [
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
						'term_id' => [
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
					],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/remove-terms',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [$this, 'remove_terms'],
					'permission_callback' => [$this, 'check_admin_permission'],
					'args'                => [
						'conversation_id' => [
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
						'term_id' => [
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
		$where['term_ids']   = '';
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
		if ( current_user_can( 'wpwax_vm_client' ) ) {
			$get_current_user = get_userdata( get_current_user_id() );
			$email = ( ! empty( $get_current_user ) ) ? $get_current_user->user_email : '';
			$args['where']['created_by'] = $email;
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

		if ( ! empty( $args['where']['term_ids'] ) ) {

			$args['where']['tax_query'] = [
				[
					'taxonomy' => 'tag',
					'field'    => 'term_id',
					'terms'    => $args['where']['term_ids'],
				]
			];

			unset( $args['where']['term_ids'] );
		}

		$conversation_data = Conversation_Model::get_items( $args );

		if ( empty( $conversation_data ) ) {
			return ( $send_rest_response ) ? $this->response( true, [] ) : [];
		}

		// Add Additional Session Data
		foreach ( $conversation_data as $conversation_key => $conversation ) {

			if ( ! empty( $conversation_data[ $conversation_key ]['created_at'] ) ) {
				$created_at = $conversation_data[ $conversation_key ]['created_at'];
				$conversation_data[ $conversation_key ]['created_at'] = Helper\get_formatted_time( $created_at, $timezone, 'Y-m-d H:i:s' );
				$conversation_data[ $conversation_key ]['created_at_formatted'] = Helper\get_formatted_time( $created_at, $timezone );
			}

			if ( ! empty( $conversation_data[ $conversation_key ]['updated_at'] ) ) {
				$updated_at = $conversation_data[ $conversation_key ]['updated_at'];
				$conversation_data[ $conversation_key ]['updated_at'] = Helper\get_formatted_time( $updated_at, $timezone, 'Y-m-d H:i:s' );
				$conversation_data[ $conversation_key ]['updated_at_formatted'] = Helper\get_formatted_time( $updated_at, $timezone );
			}

			// Add Users Data
			$users = $this->get_users_by_conversation_id( $conversation['id'] );
			$conversation_data[ $conversation_key ]['users']  = $users;

			// Get First Message
			$first_message_id = Conversation_Model::get_meta( $conversation['id'], 'first_message_id' );
			$first_message = ( ! empty( $first_message_id ) ) ? Message_Model::get_item( $first_message_id ) : null;

			// Get Last Message
			$last_message_id  = Conversation_Model::get_meta( $conversation['id'], 'last_message_id' );
			$last_message  = ( ! empty( $last_message_id ) ) ? Message_Model::get_item( $last_message_id ) : null;

			$user_emails = [];

			if ( ! empty( $first_message ) ) {
				$user_emails[] = $first_message['user_email'];
			}

			if ( ! empty( $last_message ) ) {
				$user_emails[] = $last_message['user_email'];
			}

			$message_users = Helper\get_users_data_by( 'email', $user_emails );

			$first_message_data = [
				'user'       => ( ! empty( $message_users ) ) ? $message_users[0] : null,
				'id'         => ( ! empty( $first_message ) ) ? $first_message['id'] : null,
				'created_at' => ( ! empty( $first_message ) ) ? $first_message['created_at'] : null,
				'updated_at' => ( ! empty( $first_message ) ) ? $first_message['updated_at'] : null,
			];

			$last_message_data = [
				'user'       => ( count( $message_users ) > 1 ) ? $message_users[1] : null,
				'id'         => ( ! empty( $last_message ) ) ? $last_message['id'] : null,
				'created_at' => ( ! empty( $last_message ) ) ? $last_message['created_at'] : null,
				'updated_at' => ( ! empty( $last_message ) ) ? $last_message['updated_at'] : null,
			];

			if ( ! empty( $first_message_data['created_at'] ) ) {
				$created_at = $first_message_data['created_at'];
				$first_message_data['created_at']= Helper\get_formatted_time( $created_at, $timezone, 'Y-m-d h:m:s' );
				$first_message_data['created_at_formatted'] = Helper\get_formatted_time( $created_at, $timezone );
			}

			if ( ! empty( $first_message_data['updated_at'] ) ) {
				$updated_at = $first_message_data['updated_at'];
				$first_message_data['updated_at']= Helper\get_formatted_time( $updated_at, $timezone, 'Y-m-d h:m:s' );
				$first_message_data['updated_at_formatted'] = Helper\get_formatted_time( $updated_at, $timezone );
			}

			if ( ! empty( $last_message_data['created_at'] ) ) {
				$created_at = $last_message_data['created_at'];
				$last_message_data['created_at']= Helper\get_formatted_time( $created_at, $timezone, 'Y-m-d h:m:s' );
				$last_message_data['created_at_formatted'] = Helper\get_formatted_time( $created_at, $timezone );
			}

			if ( ! empty( $last_message_data['updated_at'] ) ) {
				$updated_at = $last_message_data['updated_at'];
				$last_message_data['updated_at']= Helper\get_formatted_time( $updated_at, $timezone, 'Y-m-d h:m:s' );
				$last_message_data['updated_at_formatted'] = Helper\get_formatted_time( $updated_at, $timezone );
			}

			$conversation_data[ $conversation_key ]['first_message'] = $first_message_data;
			$conversation_data[ $conversation_key ]['last_message']  = $last_message_data;
		}

		if ( $send_rest_response ) {
			return $this->response( true, $conversation_data );
		}

		return $conversation_data;
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
		$args  = $request->get_params();
		$where = [ 'conversation_id' => $args['id'] ];

		$messages_args = [];
		$messages_args['where']  = $where;

		$messages = Message_Model::get_items( $messages_args );

		// Validate Capability
		if ( ! $this->can_current_user_view_conversation( $args['id'] ) ) {
			return new WP_Error( 403, __( 'You are not allowed to delete the resource.' ) );
		}

		$operation = Message_Model::delete_item_where( $where );
		$success   = $operation ? true : false;

		if ( ! $success ) {
			$this->response( $success );
		}

		// Delete Attachment
		foreach ( $messages as $message ) {
			Attachment_Model::delete_item( $message['attachment_id'] );
		}

		// Delete Terms
		Conversation_Term_Relationship_Model::delete_item_where( $where );

		return $this->response( $success );
	}

	/**
	 * Get terms data by IDs.
	 *
	 * @param array $user_ids
	 *
	 * @return array Users Data
	 */
	protected function get_terms_data_by_ids( $term_ids = [] )
	{
		if ( empty( $term_ids ) ) {
			return [];
		}

		$terms = [];

		foreach ( $term_ids as $term_id ) {
			$term = Term_Model::get_item( $term_id );

			if ( is_wp_error( $term ) ) {
				continue;
			}

			$terms[] = $term;
		}

		return $terms;
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

		$default['id']              = '';
		$default['add_term_ids']    = '';
		$default['remove_term_ids'] = '';

		$args = Helper\merge_params( $default, $args );

		if ( empty( $args['id'] ) ) {
			$message = __('The conversation ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$conversation_exists = $this->is_conversation_exists( $args['id'] );

		if ( is_wp_error( $conversation_exists ) ) {
			return $conversation_exists;
		}

		$add_terms    = ( ! empty( $args['add_term_ids'] ) ) ? Helper\convert_string_to_int_array( $args['add_term_ids'] ) : [];
		$remove_terms = ( ! empty( $args['remove_term_ids'] ) ) ? Helper\convert_string_to_int_array( $args['remove_term_ids'] ) : [];

		if ( empty( $add_terms ) && empty( $remove_terms ) ) {
			$message = __('Nothing to add or remove.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		$data = [
			'add_terms_status'    => [],
			'remove_terms_status' => [],
		];

		// Add Terms
		if ( ! empty( $add_terms ) ) {
			$data['add_terms_status'] = $this->add_conversation_terms( $args['id'], $add_terms );
		}

		// Remove Terms
		if ( ! empty( $remove_terms ) ) {
			$data['remove_terms_status'] = $this->remove_conversation_terms( $args['id'], $remove_terms );
		}

		$conversation_terms_args = [
			'where' => [
				'conversation_id' =>  $args['id'],
			],
		];

		$data['current_terms'] = Conversation_Term_Relationship_Model::get_items( $conversation_terms_args );

		return $this->response( true, $data );
	}

	/**
	 * Add Conversation Terms
	 *
	 * @param string $conversation_id
	 * @param array $term_ids
	 *
	 * @return array Status
	 */
	public function add_conversation_terms( $conversation_id = '', $term_ids = [] )
	{
		$status = [
			'failed'  => [],
			'success' => [],
		];

		if ( empty( $conversation_id ) || empty( $term_ids ) ) {
			return $status;
		}

		foreach ( $term_ids as $term_id ) {
			$create_status = Conversation_Term_Relationship_Model::create_item([
				'conversation_id' => $conversation_id,
				'term_id'         => $term_id,
			]);

			if ( is_wp_error( $create_status ) ) {
				$status['failed'][] = $term_id;
				continue;
			}

			$status['success'][] = $term_id;
		}

		return $status;
	}

	/**
	 * Remove Conversation Terms
	 *
	 * @param string $conversation_id
	 * @param array $term_ids
	 *
	 * @return array Status
	 */
	public function remove_conversation_terms( $conversation_id = '', $term_ids = [] )
	{
		$status = [
			'failed'  => [],
			'success' => [],
		];

		if ( empty( $conversation_id ) || empty( $term_ids ) ) {
			return $status;
		}

		foreach ( $term_ids as $term_id ) {
			$delete_status = Conversation_Term_Relationship_Model::delete_item_where([
				'conversation_id'  => $conversation_id,
				'term_taxonomy_id' => $term_id,
			]);

			if ( is_wp_error( $delete_status ) ) {
				$status['failed'][] = $term_id;
				continue;
			}

			$status['success'][] = $term_id;
		}

		return $status;
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

		$default['conversation_id'] = '';
		$default['term_id']         = '';

		$args = Helper\merge_params($default, $args);

		if ( empty( $args['conversation_id'] ) ) {
			$message = __('The conversation ID is required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		$conversation_exists = $this->is_conversation_exists( $args['conversation_id'] );

		if ( is_wp_error( $conversation_exists ) ) {
			return $conversation_exists;
		}

		if ( empty( $args['term_id'] ) ) {
			$message = __('The term ID is required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		$terms = Helper\convert_string_to_int_array( $args['term_id'] );

		if ( empty( $terms ) ) {
			$message = __('The term ID is required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		$data = [];

		$data['failed']  = [];
		$data['success'] = [];

		foreach ( $terms as $term_id ) {

			$status = Conversation_Term_Relationship_Model::create_item([
				'conversation_id' => $args['conversation_id'],
				'term_id'    => $term_id,
			]);

			if ( is_wp_error( $status ) ) {
				$data['failed'][] = $term_id;
				continue;
			}

			$data['success'][] = $term_id;
		}

		return $this->response( true, $data);
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

		$default['conversation_id'] = '';
		$default['term_id']         = '';

		$args = Helper\merge_params( $default, $args );

		if ( empty( $args['conversation_id'] ) ) {
			$message = __('The conversation ID is required.', 'wpwax-customer-support-app');
			return new WP_Error( 403, $message );
		}

		$conversation_exists = $this->is_conversation_exists( $args['conversation_id'] );

		if ( is_wp_error( $conversation_exists ) ) {
			return $conversation_exists;
		}

		if ( empty( $args['term_id'] ) ) {
			$message = __('The term ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$terms = Helper\convert_string_to_int_array( $args['term_id'] );

		if ( empty( $terms ) ) {
			$message = __('The term ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$data = [];

		$data['failed']  = [];
		$data['success'] = [];

		foreach ( $terms as $term_id ) {
			$status = Conversation_Term_Relationship_Model::delete_item_where([
				'conversation_id'  => $args['conversation_id'],
				'term_taxonomy_id' => $term_id,
			]);

			if ( is_wp_error( $status ) ) {
				$data['failed'][] = $term_id;
				continue;
			}

			$data['success'][] = $term_id;
		}

		return $this->response( true, $data );
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
		$conversation_id = $args['conversation_id'];

		$session_exists = $this->is_conversation_exists( $conversation_id );

		if ( is_wp_error( $session_exists ) ) {
			return $session_exists;
		}

		// Validate Capability
		if ( ! $this->can_current_user_view_conversation( $args['conversation_id'] ) ) {
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
		$conversation_id = $args['conversation_id'];

		$session_exists = $this->is_conversation_exists( $conversation_id );

		if ( is_wp_error( $session_exists ) ) {
			return $session_exists;
		}

		// Validate Capability
		if ( ! $this->can_current_user_view_conversation( $args['conversation_id'] ) ) {
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

		if ( current_user_can( 'edit_posts' ) ) {
			return true;
		}

		if ( current_user_can( 'wpwax_vm_client' ) ) {
			$conversation = Conversation_Model::get_item( $conversation_id );

			if ( is_wp_error( $conversation ) ) {
				return false;
			}

			return $conversation['created_by'] === Helper\get_current_user_email();
		}

		return false;
	}

	/**
	 * Is conversation exists
	 *
	 * @param string $conversation_id
	 * @return bool|WP_Error
	 */
	public function is_conversation_exists( $conversation_id = 0 )
	{
		$session = Conversation_Model::get_item( $conversation_id );

		if ( is_wp_error( $session ) ) {
			$message = __('The session does not exist.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		return true;
	}
}
