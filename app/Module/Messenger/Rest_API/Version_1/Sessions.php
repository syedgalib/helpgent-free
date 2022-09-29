<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Rest_API\Version_1;

use \WP_Error;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Session_Term_Relationship_Model;
use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Core\Model\Attachment_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Cache_Messages_Marked_As_Read_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Messages_Seen_By_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Term_Model;

class Sessions extends Rest_Base
{

	/**
	 * Rest Base
	 *
	 * @var string
	 */
	public $rest_base = 'sessions';

	public function register_routes()
	{
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => [$this, 'get_items'],
					'permission_callback' => [$this, 'check_auth_permission'],
					'args'                => [
						'page'        => [
							'default'           => 1,
							'validate_callback' => [$this, 'validate_int'],
						],
						'order_by'       => [
							'default'           => 'latest',
							'validate_callback' => [$this, 'validate_order'],
						],
					],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<session_id>[\w]+)',
			[
				[
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => [$this, 'get_item'],
					'permission_callback' => [$this, 'check_auth_permission'],
				],
			]
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<session_id>[\w]+)',
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
			'/' . $this->rest_base . '/(?P<session_id>[\w]+)/mark-as-read',
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
			'/' . $this->rest_base . '/(?P<session_id>[\w]+)/mark-as-unread',
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
			'/' . $this->rest_base . '/(?P<session_id>[\w]+)/update-terms',
			[
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [$this, 'update_terms'],
					'permission_callback' => [$this, 'check_auth_permission'],
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
					'permission_callback' => [$this, 'check_auth_permission'],
					'args'                => [
						'session_id' => [
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
					'permission_callback' => [$this, 'check_auth_permission'],
					'args'                => [
						'session_id' => [
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

		$where['session_id'] = '';
		$where['term_ids']   = '';

		$where['updated_on']                   = '';
		$where['updated_on_compare_date_time'] = '=';
		$where['updated_on_compare_day']       = '=';
		$where['updated_on_compare_month']     = '=';
		$where['updated_on_compare_year']      = '=';
		$where['updated_on_between']           = '';


		$where['created_on']                   = '';
		$where['created_on_compare_date_time'] = '=';
		$where['created_on_compare_day']       = '=';
		$where['created_on_compare_month']     = '=';
		$where['created_on_compare_year']      = '=';
		$where['created_on_between']           = '';

		$where = Helper\filter_params($where, $args);

		$default = [];

		$default['search']   = '';
		$default['page']     = 1;
		$default['limit']    = 20;
		$default['order_by'] = 'latest';

		$args = Helper\filter_params($default, $args);
		$args['where'] = $where;

		$args['group_by'] = 'session_id';
		$args['fields']   =  [
			'session_id',
			'total_message',
			'total_unread',
			'updated_on',
			'terms',
			'unread_messages',
			'my_message_count',
		];

		$user = wp_get_current_user();
		$args['current_user_id'] = $user->ID;

		if (!$this->is_user_admin($user)) {
			$args['having'] = [
				'field'     => 'my_message_count',
				'condition' => '>',
				'value'     => 0,
			];
		}

		if (!empty($args['search'])) {
			$users = Helper\search_users($args['search'], ['id']);

			if (!empty($users)) {
				$users = array_map(function ($user) {
					return $user['id'];
				}, $users);

				$users_ids = trim(join(',', $users));

				$args['where']['user_id'] = [
					'field'   => 'user_id',
					'compare' => 'IN',
					'value'   => "( $users_ids )",
				];
			} else {
				$args['where']['user_id'] = [
					'field'   => 'user_id',
					'compare' => '=',
					'value'   => 0,
				];
			}
		}

		$session_data = Message_Model::get_items($args);

		if (empty($session_data)) {
			return ($send_rest_response) ? $this->response(true, []) : [];
		}

		$self = $this;

		// Expand session data
		$session_data = array_map(function ($item) use ($self) {
			// Expand term data
			$terms_ids = Helper\convert_string_to_int_array($item['terms']);
			$item['terms'] = $self->get_terms_data_by_ids($terms_ids);

			return $item;
		}, $session_data);

		// Add Additional Session Data
		foreach ($session_data as $session_key => $session) {

			// Add Users Data
			$users = $this->get_users_by_session_id($session['session_id']);
			$session_data[$session_key]['users']  = $users;

			// First Message Data
			$first_message_query_args = [
				'where' => [
					'session_id' => $session['session_id'],
				],
				'order_by' => 'oldest',
				'limit'    => 1,
			];

			$first_message = Message_Model::get_items($first_message_query_args);
			$first_message = (!empty($first_message)) ? $first_message[0] : null;

			$user_ids = [];

			if (!empty($first_message)) {
				$user_ids[] = $first_message['user_id'];
			}

			// Last Message Data
			$last_message_query_args = $first_message_query_args;
			$last_message_query_args['order_by'] = 'latest';

			$last_message = Message_Model::get_items($last_message_query_args);
			$last_message = (!empty($last_message)) ? $last_message[0] : null;

			if (!empty($last_message)) {
				$user_ids[] = $last_message['user_id'];
			}

			$message_users = Helper\get_users_data_by_ids($user_ids);

			$first_message_data = [
				'user'       => (!empty($message_users)) ? $message_users[0] : null,
				'message_id' => (!empty($first_message)) ? $first_message['message_id'] : null,
				'created_on' => (!empty($first_message)) ? $first_message['created_on'] : null,
				'updated_on' => (!empty($first_message)) ? $first_message['updated_on'] : null,
			];

			$last_message_data = [
				'user'       => (count($message_users) > 1) ? $message_users[1] : null,
				'message_id' => (!empty($last_message)) ? $last_message['message_id'] : null,
				'created_on' => (!empty($last_message)) ? $last_message['created_on'] : null,
				'updated_on' => (!empty($last_message)) ? $last_message['updated_on'] : null,
			];

			$session_data[$session_key]['first_message'] = $first_message_data;
			$session_data[$session_key]['last_message']  = $last_message_data;
		}

		if ($send_rest_response) {
			return $this->response(true, $session_data);
		}

		return $session_data;
	}

	/**
	 * Get users by session ID
	 *
	 * @param string $session_id
	 *
	 * @return array Users
	 */
	public function get_users_by_session_id($session_id)
	{
		$args = [];

		$where = [];
		$where['session_id'] = $session_id;
		$args['where'] = $where;

		$args['limit']    = -1;
		$args['group_by'] = 'user_id';
		$args['fields']   = 'user_id';

		$messages = Message_Model::get_items($args);

		if (empty($messages)) {
			return [];
		}

		$users_ids = array_map(function ($message) {

			return (int) $message['user_id'];
		}, $messages);

		return Helper\get_users_data_by_ids($users_ids);
	}

	/**
	 * Get Item
	 *
	 * @param $request
	 * @return mixed
	 */
	public function get_item($request)
	{
		$request->set_param('limit', 1);
		$request->set_param('session_id', $request->get_param('session_id'));

		$session_data = $this->get_items($request, false);

		if (is_wp_error($session_data)) {
			return $session_data;
		}

		$session_data = !empty($session_data) && is_array($session_data) ? $session_data[0] : [];

		return $this->response(true, $session_data);
	}

	/**
	 * Delete Item
	 *
	 * @param $request
	 * @return mixed
	 */
	public function delete_item($request)
	{
		$args  = $request->get_params();
		$where = ['session_id' => $args['session_id']];

		$messages_args = [];
		$messages_args['where']  = $where;

		$messages = Message_Model::get_items($messages_args);

		if (empty($messages)) {
			$message = __('No resource exists.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$operation = Message_Model::delete_item_where($where);
		$success   = $operation ? true : false;

		if (!$success) {
			$this->response($success);
		}

		// Delete Attachment
		foreach ($messages as $message) {
			Attachment_Model::delete_item($message['attachment_id']);
		}

		// Delete Terms
		Session_Term_Relationship_Model::delete_item_where($where);

		return $this->response($success);
	}

	/**
	 * Get terms data by IDs.
	 *
	 * @param array $user_ids
	 *
	 * @return array Users Data
	 */
	protected function get_terms_data_by_ids($term_ids = [])
	{

		if (empty($term_ids)) {
			return [];
		}

		$terms = [];

		foreach ($term_ids as $term_id) {
			$term = Term_Model::get_item($term_id);

			if (is_wp_error($term)) {
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
	public function update_terms($request)
	{
		$args = $request->get_params();

		$default = [];

		$default['session_id']      = '';
		$default['add_term_ids']    = '';
		$default['remove_term_ids'] = '';

		$args = Helper\merge_params($default, $args);

		if (empty($args['session_id'])) {
			$message = __('The session ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$session_exists = $this->session_exists($args['session_id']);

		if (is_wp_error($session_exists)) {
			return $session_exists;
		}

		$add_terms    = (!empty($args['add_term_ids'])) ? Helper\convert_string_to_int_array($args['add_term_ids']) : [];
		$remove_terms = (!empty($args['remove_term_ids'])) ? Helper\convert_string_to_int_array($args['remove_term_ids']) : [];

		if (empty($add_terms) && empty($remove_terms)) {
			$message = __('Nothing to add or remove.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$data = [
			'add_terms_status'    => [],
			'remove_terms_status' => [],
		];

		// Add Terms
		if (!empty($add_terms)) {
			$data['add_terms_status'] = $this->add_session_terms($args['session_id'], $add_terms);
		}

		// Remove Terms
		if (!empty($remove_terms)) {
			$data['remove_terms_status'] = $this->remove_session_terms($args['session_id'], $remove_terms);
		}

		$session_terms_args = [
			'where' => [
				'session_id' =>  $args['session_id'],
			],
		];

		$data['current_terms'] = Session_Term_Relationship_Model::get_items($session_terms_args);

		return $this->response(true, $data);
	}

	/**
	 * Add Session Terms
	 *
	 * @param string $session_id
	 * @param array $term_ids
	 *
	 * @return array Status
	 */
	public function add_session_terms($session_id = '', $term_ids = [])
	{
		$status = [
			'failed'  => [],
			'success' => [],
		];

		if (empty($session_id) || empty($term_ids)) {
			return $status;
		}

		foreach ($term_ids as $term_id) {
			$create_status = Session_Term_Relationship_Model::create_item([
				'session_id' => $session_id,
				'term_id'    => $term_id,
			]);

			if (is_wp_error($create_status)) {
				$status['failed'][] = $term_id;
				continue;
			}

			$status['success'][] = $term_id;
		}

		return $status;
	}

	/**
	 * Remove Session Terms
	 *
	 * @param string $session_id
	 * @param array $term_ids
	 *
	 * @return array Status
	 */
	public function remove_session_terms($session_id = '', $term_ids = [])
	{
		$status = [
			'failed'  => [],
			'success' => [],
		];

		if (empty($session_id) || empty($term_ids)) {
			return $status;
		}

		foreach ($term_ids as $term_id) {
			$delete_status = Session_Term_Relationship_Model::delete_item_where([
				'session_id'       => $session_id,
				'term_taxonomy_id' => $term_id,
			]);

			if (is_wp_error($delete_status)) {
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
	public function add_terms($request)
	{
		$args = $request->get_params();

		$default = [];

		$default['session_id'] = '';
		$default['term_id']    = '';

		$args = Helper\merge_params($default, $args);

		if (empty($args['session_id'])) {
			$message = __('The session ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$session_exists = $this->session_exists($args['session_id']);

		if (is_wp_error($session_exists)) {
			return $session_exists;
		}

		if (empty($args['term_id'])) {
			$message = __('The term ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$terms = Helper\convert_string_to_int_array($args['term_id']);

		if (empty($terms)) {
			$message = __('The term ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$data = [];

		$data['failed']  = [];
		$data['success'] = [];

		foreach ($terms as $term_id) {

			$status = Session_Term_Relationship_Model::create_item([
				'session_id' => $args['session_id'],
				'term_id'    => $term_id,
			]);

			if (is_wp_error($status)) {
				$data['failed'][$term_id] = $status;
				continue;
			}

			$data['success'][$term_id] = $status;
		}

		$success = (count($data['success']) === count($terms)) ? true : false;

		return $this->response($success, $data);
	}

	/**
	 * Remove Terms
	 *
	 * @param $request
	 * @return array Response
	 */
	public function remove_terms($request)
	{
		$args = $request->get_params();

		$default = [];

		$default['session_id'] = '';
		$default['term_id']    = '';

		$args = Helper\merge_params($default, $args);

		if (empty($args['session_id'])) {
			$message = __('The session ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$session_exists = $this->session_exists($args['session_id']);

		if (is_wp_error($session_exists)) {
			return $session_exists;
		}

		if (empty($args['term_id'])) {
			$message = __('The term ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$terms = Helper\convert_string_to_int_array($args['term_id']);

		if (empty($terms)) {
			$message = __('The term ID is required.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		$data = [];

		$data['failed']  = [];
		$data['success'] = [];

		foreach ($terms as $term_id) {

			$status = Session_Term_Relationship_Model::delete_item_where([
				'session_id'       => $args['session_id'],
				'term_taxonomy_id' => $term_id,
			]);

			if (is_wp_error($status)) {
				$data['failed'][$term_id] = $status;
				continue;
			}

			$data['success'][$term_id] = $status;
		}

		$success = (count($data['success']) === count($terms)) ? true : false;

		return $this->response($success, $data);
	}

	/**
	 * Mark as Read
	 *
	 * @param $request
	 * @return mixed
	 */
	public function mark_as_read($request)
	{
		$args            = $request->get_params();
		$sassion_id      = $args['session_id'];
		$current_user_id = get_current_user_id();

		if (empty($current_user_id)) {
			return new WP_Error(403, __('You must have to be logged in', 'wpwax-customer-support-app'));
		}

		$session_exists = $this->session_exists($sassion_id);

		if (is_wp_error($session_exists)) {
			return $session_exists;
		}

		$log = [];

		$unread_messages = $this->get_unread_messages($sassion_id, $current_user_id);

		if (empty($unread_messages)) {
			$response_data = [
				'messages_marked_as_read' => [],
				'total_unread'            => 0,
				'log'                     => $log,
			];

			return $this->response($response_data);
		}

		$messages_marked_as_read = [];

		// Set Mark as Read
		foreach ($unread_messages as $message) {
			$args = [
				'user_id'    => $current_user_id,
				'session_id' => $message['session_id'],
				'message_id' => $message['id'],
			];

			// Mark as Read
			$mark_as_read = Messages_Seen_By_Model::create_item($args);

			// Cache marked as read
			$cache_mark_as_read = Cache_Messages_Marked_As_Read_Model::create_item($args);

			if (!is_wp_error($mark_as_read)) {
				$messages_marked_as_read[] = $message['id'];
			}

			$log[] = [
				'message_id'         => $message['id'],
				'marked_as_read'     => !is_wp_error($mark_as_read),
				'cache_mark_as_read' => !is_wp_error($cache_mark_as_read),
			];
		}

		if (!empty($messages_marked_as_read)) {
			$messages_marked_as_read = array_map(function ($item) {
				return (int) $item;
			}, $messages_marked_as_read);
		}

		$unread_messages = $this->get_unread_messages($sassion_id, $current_user_id);

		// Response Data
		$data = [
			'messages_marked_as_read' => $messages_marked_as_read,
			'total_unread'            => count($unread_messages),
			'log'                     => $log,
		];

		return $this->response($data);
	}

	/**
	 * Mark as Unread
	 *
	 * @param $request
	 * @return mixed
	 */
	public function mark_as_unread($request)
	{
		$args            = $request->get_params();
		$sassion_id      = $args['session_id'];
		$current_user_id = get_current_user_id();

		if (empty($current_user_id)) {
			return new WP_Error(403, __('You must have to be logged in', 'wpwax-customer-support-app'));
		}

		$session_exists = $this->session_exists($sassion_id);

		if (is_wp_error($session_exists)) {
			return $session_exists;
		}

		$unread_messages = $this->get_unread_messages($sassion_id, $current_user_id);

		$log = [];

		// Get all messages marked read
		$query_args = [
			'where' => [
				'user_id'    => $current_user_id,
				'session_id' => $sassion_id,
			]
		];

		$marked_as_read_messages = Cache_Messages_Marked_As_Read_Model::get_items($query_args);

		if (empty($marked_as_read_messages)) {
			$response_data = [
				'messages_marked_as_unread' => [],
				'total_unread'              => count($unread_messages),
				'log'                       => $log,
			];

			return $this->response($response_data);
		}

		$messages_marked_as_unread = [];

		// Set Mark as Unread
		foreach ($marked_as_read_messages as $message) {
			$args = [
				'user_id'    => $message['user_id'],
				'session_id' => $message['session_id'],
				'message_id' => $message['message_id'],
			];

			// Mark as Read
			$mark_as_unread = Messages_Seen_By_Model::delete_item_where($args);

			// Cache marked as read
			$cache_mark_as_unread = Cache_Messages_Marked_As_Read_Model::delete_item_where($args);

			if (!is_wp_error($mark_as_unread)) {
				$messages_marked_as_unread[] = $message['message_id'];
			}

			$log[] = [
				'message_id'             => $message['message_id'],
				'marked_as_unread'       => !is_wp_error($mark_as_unread),
				'cache_marked_as_unread' => !is_wp_error($cache_mark_as_unread)
			];
		}

		if (!empty($messages_marked_as_unread)) {
			$messages_marked_as_unread = array_map(function ($item) {
				return (int) $item;
			}, $messages_marked_as_unread);
		}

		$unread_messages = $this->get_unread_messages($sassion_id, $current_user_id);

		// Response Data
		$data = [
			'messages_marked_as_unread' => $messages_marked_as_unread,
			'total_unread'              => count($unread_messages),
			'log'                       => $log,
		];

		return $this->response($data);
	}

	/**
	 * Is session exists
	 *
	 * @param string $session_id
	 * @return bool|WP_Error
	 */
	public function session_exists($session_id = '')
	{
		$session = Message_Model::get_items([
			'where' => ['session_id' => $session_id],
			'limit' => 1,
		]);

		if (empty($session)) {
			$message = __('The session does not exist.', 'wpwax-customer-support-app');
			return new WP_Error(403, $message);
		}

		return true;
	}


	/**
	 * Get Unread messages
	 *
	 * @param string $sassion_id
	 * @param int $current_user_id
	 *
	 * @return array Messages
	 */
	public function get_unread_messages($sassion_id, $current_user_id)
	{
		// Get all unread messages
		$query_args = [
			'where' => [
				'session_id' => $sassion_id,
				'seen'       => 0,
				'user_id'    => [
					'field'   => 'user_id',
					'compare' => '!=',
					'value'   => $current_user_id,
				],
			],
			'limit'           => -1,
			'current_user_id' => $current_user_id,
			'fields'          => ['id', 'session_id', 'user_id', 'seen_by', 'is_seen'],
		];

		return Message_Model::get_items($query_args);
	}
}
