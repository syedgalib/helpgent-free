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

class Sessions extends Rest_Base {

    /**
     * Rest Base
     *
     * @var string
     */
    public $rest_base = 'sessions';

    public function register_routes() {

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                    'args'                => [
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
            '/' . $this->rest_base . '/(?P<id>[\w]+)',
            [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_item' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\w]+)',
            [
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [ $this, 'delete_item' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\w]+)/mark-as-read',
            [
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'mark_as_read' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\w]+)/mark-as-unread',
            [
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'mark_as_unread' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/add-terms',
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'add_terms' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
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
                    'callback'            => [ $this, 'remove_terms' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
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
    public function validate_message_type( $value ) {
        return in_array( $value, [ 'text', 'video', 'audio' ] );
    }

    /**
     * Validate Order
     *
     * @param $value
     */
    public function validate_order( $value ) {
        return in_array( $value, [ 'latest', 'oldest', 'read', 'unread' ] );
    }

    /**
     * Get Items
     *
     * @param $request
     * @return mixed
     */
    public function get_items( $request ) {

        // Get session data
        $args = $request->get_params();

        $default = [];

        $default['order_by'] = 'latest';

        $args = array_merge( $default, $args );

        $args['group_by'] = 'session_id';
        $args['fields']   = 'session_id, users, total_message, total_unread, updated_on, terms';

        $session_data = Message_Model::get_items( $args );

        if ( empty( $session_data ) ) {
            return $this->response( true, [] );
        }

		$self = $this;

        // Expand session data
        $session_data = array_map( function( $item ) use( $self ) {
			// Expand user data
            $user_ids = Helper\convert_string_to_int_array( $item['users'] );
            $item['users'] = $self->get_users_data_by_ids( $user_ids );

			// Expand term data
            $terms_ids = Helper\convert_string_to_int_array( $item['terms'] );
            $item['terms'] = $self->get_terms_data_by_ids( $terms_ids );

            return $item;

        }, $session_data );


        return $this->response( true, $session_data );
    }

    /**
     * Get Item
     *
     * @param $request
     * @return mixed
     */
    public function get_item( $request ) {
        $args = $request->get_params();

        $default = [];

        $default['order_by'] = 'latest';

        $args = array_merge( $default, $args );

        $args['group_by'] = 'session_id';
        $args['limit']    = 1;
        $args['fields']   = 'session_id, users, total_message, total_unread, updated_on, terms';

        $session_data = Message_Model::get_items( $args );

        if ( empty( $session_data ) ) {
            return $this->response( true, [] );
        }

		$self = $this;

        // Expand session data
        $session_data = array_map( function( $item ) use( $self ) {
			// Expand user data
            $user_ids = Helper\convert_string_to_int_array( $item['users'] );
            $item['users'] = $self->get_users_data_by_ids( $user_ids );

			// Expand term data
            $terms_ids = Helper\convert_string_to_int_array( $item['terms'] );
            $item['terms'] = $self->get_terms_data_by_ids( $terms_ids );

            return $item;

        }, $session_data );

		$session_data = $session_data[0];

        return $this->response( true, $session_data );
    }

	/**
     * Delete Item
     *
     * @param $request
     * @return mixed
     */
    public function delete_item( $request ) {
        $args  = $request->get_params();
        $where = [ 'session_id' => $args['id'] ];

        $messages_args = [];
        $messages_args['where']  = $where;

        $messages = Message_Model::get_items( $messages_args );

        if ( empty( $messages ) ) {
            $message = __( 'No resource exists.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $operation = Message_Model::delete_item_where( $where );
        $success   = $operation ? true : false;

        if ( ! $success ) {
            $this->response( $success );
        }

        // Delete Attachment
        foreach( $messages as $message ) {
            Attachment_Model::delete_item( $message['attachment_id'] );
        }

        // Delete Terms
        Session_Term_Relationship_Model::delete_item_where( $where );

        return $this->response( $success );
    }

	/**
	 * Get terms data by IDs.
	 *
	 * @param array $user_ids
	 *
	 * @return array Users Data
	 */
	protected function get_terms_data_by_ids( $term_ids = [] ) {

		if ( empty( $term_ids ) ) {
			return [];
		}

		$terms = [];

		foreach( $term_ids as $term_id ) {
			$terms[] = Term_Model::get_item( $term_id );
		}

		return $terms;
	}

	/**
	 * Get users data by IDs.
	 *
	 * @param array $user_ids
	 *
	 * @return array Users Data
	 */
	protected function get_users_data_by_ids( $user_ids = [] ) {

		if ( empty( $user_ids ) ) {
			return [];
		}

		$users = [];

		foreach( $user_ids as $user_id ) {
			$user = get_user_by( 'id', $user_id );

			if ( empty( $user ) ) {
				continue;
			}

			$avater = get_user_meta( $user->ID, '_wpwax_vm_avater', true );

			$user_info = [];

			$user_info['id']     = $user->ID;
			$user_info['name']   = $user->display_name;
			$user_info['avater'] = $avater;

			array_push( $users, $user_info );
		}

		return $users;
	}

    /**
     * Add Terms
     *
     * @param $request
     * @return array Response
     */
    public function add_terms( $request ) {
        $args = $request->get_params();

        $default = [];

        $default['session_id'] = '';
        $default['term_id']    = '';

        $args = Helper\merge_params( $default, $args );

        if ( empty( $args['session_id'] ) ) {
            $message = __( 'The session ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['term_id'] ) ) {
            $message = __( 'The term ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $terms = Helper\convert_string_to_int_array( $args['term_id'] );

        if ( empty( $terms ) ) {
            $message = __( 'The term ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $data = [];

        $data['failed']  = [];
        $data['success'] = [];

        foreach( $terms as $term_id ) {

            $status = Session_Term_Relationship_Model::create_item([
                'session_id' => $args['session_id'],
                'term_id'    => $term_id,
            ]);

            if ( is_wp_error( $status ) ) {
                $data['failed'][ $term_id ] = $status;
                continue;
            }

            $data['success'][ $term_id ] = $status;

        }

        $success = ( count( $data['success'] ) === count( $terms ) ) ? true : false;

        return $this->response( $success, $data );
    }

    /**
     * Remove Terms
     *
     * @param $request
     * @return array Response
     */
    public function remove_terms( $request ) {
        $args = $request->get_params();

        $default = [];

        $default['session_id'] = '';
        $default['term_id']    = '';

        $args = Helper\merge_params( $default, $args );

        if ( empty( $args['session_id'] ) ) {
            $message = __( 'The session ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['term_id'] ) ) {
            $message = __( 'The term ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $terms = Helper\convert_string_to_int_array( $args['term_id'] );

        if ( empty( $terms ) ) {
            $message = __( 'The term ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $data = [];

        $data['failed']  = [];
        $data['success'] = [];

        foreach( $terms as $term_id ) {

            $status = Session_Term_Relationship_Model::delete_item_where([
                'session_id'       => $args['session_id'],
                'term_taxonomy_id' => $term_id,
            ]);

            if ( is_wp_error( $status ) ) {
                $data['failed'][ $term_id ] = $status;
                continue;
            }

            $data['success'][ $term_id ] = $status;

        }

        $success = ( count( $data['success'] ) === count( $terms ) ) ? true : false;

        return $this->response( $success, $data );
    }

	/**
     * Mark as Read
     *
     * @param $request
     * @return mixed
     */
	public function mark_as_read( $request ) {
		$args            = $request->get_params();
		$sassion_id      = $args['id'];
		$current_user_id = ( ! empty( $args['current_user_id'] ) ) ? $args['current_user_id'] : 0;

		$log = [];

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
			'limit'  => -1,
			'fields' => ['id', 'user_id', 'seen_by'],
		];

		$unread_messages = Message_Model::get_items( $query_args );

		if ( empty( $unread_messages ) ) {
			$response_data = [
				'messages_marked_as_read' => [],
				'log'                     => $log,
			];

			return $this->response( $response_data );
		}

		$messages_marked_as_read = [];

		// Set Mark as Read
		foreach( $unread_messages as $message ) {
			$args = [
				'user_id'    => $current_user_id,
				'session_id' => $message['session_id'],
				'message_id' => $message['id'],
			];

			// Mark as Read
			$mark_as_read = Messages_Seen_By_Model::create_item( $args );

			// Cache marked as read
			$cache_mark_as_read = Cache_Messages_Marked_As_Read_Model::create_item( $args );

			if ( ! is_wp_error( $mark_as_read ) ) {
				$messages_marked_as_read[] = $message['id'];
			}

			$log[] = [
				'message_id'         => $message['id'],
				'marked_as_read'     => ! is_wp_error( $mark_as_read ),
				'cache_mark_as_read' => ! is_wp_error( $cache_mark_as_read )
			];
		}

		if ( ! empty( $messages_marked_as_read ) ) {
			$messages_marked_as_read = array_map( function( $item ) { return (int) $item; }, $messages_marked_as_read );
		}

		// Response Data
		$data = [
			'messages_marked_as_read' => $messages_marked_as_read,
			'log'                     => $log,
		];

		return $this->response( $data );
	}

	/**
     * Mark as Unread
     *
     * @param $request
     * @return mixed
     */
	public function mark_as_unread( $request ) {
		$args            = $request->get_params();
		$sassion_id      = $args['id'];
		$current_user_id = ( ! empty( $args['current_user_id'] ) ) ? $args['current_user_id'] : 0;

		$log = [];

		// Get all messages marked read
		$query_args = [
			'where' => [
				'user_id'    => $current_user_id,
				'session_id' => $sassion_id,
			]
		];

		$marked_as_read_messages = Cache_Messages_Marked_As_Read_Model::get_items( $query_args );

		if ( empty( $marked_as_read_messages ) ) {
			$response_data = [
				'messages_marked_as_unread' => [],
				'status'                    => $log,
			];

			return $this->response( $response_data );
		}

		$messages_marked_as_unread = [];

		// Set Mark as Unread
		foreach( $marked_as_read_messages as $message ) {
			$args = [
				'user_id'    => $message['user_id'],
				'session_id' => $message['session_id'],
				'message_id' => $message['message_id'],
			];

			// Mark as Read
			$mark_as_unread = Messages_Seen_By_Model::delete_item_where( $args );

			// Cache marked as read
			$cache_mark_as_unread = Cache_Messages_Marked_As_Read_Model::delete_item_where( $args );

			if ( ! is_wp_error( $mark_as_unread ) ) {
				$messages_marked_as_unread[] = $message['message_id'];
			}

			$log[] = [
				'message_id'             => $message['message_id'],
				'marked_as_unread'       => ! is_wp_error( $mark_as_unread ),
				'cache_marked_as_unread' => ! is_wp_error( $cache_mark_as_unread )
			];

		}

		if ( ! empty( $messages_marked_as_unread ) ) {
			$messages_marked_as_unread = array_map( function( $item ) { return (int) $item; }, $messages_marked_as_unread );
		}

		// Response Data
		$data = [
			'messages_marked_as_unread' => $messages_marked_as_unread,
			'log'                       => $log,
		];

		return $this->response( $data );
	}

}
