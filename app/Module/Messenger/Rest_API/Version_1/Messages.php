<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Rest_API\Version_1;

use WP_Error;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;
use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Core\Model\Attachment_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Conversation_Model;

class Messages extends Rest_Base
{

    /**
     * Rest Base
     *
     * @var string
     */
    public $rest_base = 'messages';

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
                        'timezone'    => [
                            'default'           => '',
                            'sanitize_callback' => [ $this, 'sanitize_timezone_string' ],
                        ],
                        'page'        => [
                            'default'           => 1,
                            'validate_callback' => [ $this, 'validate_int' ],
                        ],
                        'order'       => [
                            'default'           => 'latest',
                            'validate_callback' => [ $this, 'validate_order' ],
                        ],
                        'conversation_id'  => [
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [$this, 'create_item'],
                    'permission_callback' => [$this, 'check_guest_permission'],
                    'args'                => [
                        'user_email' => [
                            'required'          => false,
                            'validate_callback' => [$this, 'validate_email'],
                            'sanitize_callback' => 'sanitize_email',
                        ],
                        'message' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'attachment_id' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'message_type' => [
                            'required'          => false,
                            'validate_callback' => [$this, 'validate_message_type'],
                        ],
                    ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\d]+)',
            [
                'args' => [
                    'form_id' => [
                        'type' => 'integer',
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get_item'],
                    'permission_callback' => [$this, 'check_auth_permission'],
                    'args'                => [
                        'timezone' => [
                            'default'           => '',
                            'sanitize_callback' => [ $this, 'sanitize_timezone_string' ],
                        ],
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [$this, 'update_item'],
                    'permission_callback' => [$this, 'check_auth_permission'],
                    'args'                => [
                        'user_email'         => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'message' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'attachment_id' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'message_type' => [
                            'required'          => false,
                            'validate_callback' => [$this, 'validate_message_type'],
                        ],
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [$this, 'delete_item'],
                    'permission_callback' => [$this, 'check_auth_permission'],
                ],
            ]
        );
    }

    /**
     * @param $value
     */
    public function validate_message_type($value)
    {
        return in_array( $value, [ 'text', 'video', 'audio' ] );
    }

    /**
     * @param $value
     */
    public function validate_order($value)
    {
        return in_array($value, ['latest', 'oldest']);
    }

    /**
     * @param $request
     * @return mixed
     */
    public function get_items($request)
    {
        $args = $request->get_params();

        $where = [];

        $where['conversation_id'] = '';
        $where['message']         = '';
        $where['message_type']    = '';
        $where['user_email']      = '';
        $where['updated_at']      = '';
        $where['created_at']      = '';

        $where = Helper\filter_params($where, $args);

        $default = [];

        $default['limit']    = 20;
        $default['page']     = 1;
        $default['group_by'] = '';
        $default['order_by'] = '';
        $default['timezone'] = '';

        $args = Helper\filter_params( $default, $args );

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

        $args['where'] = $where;

        // Filter By Message
        if ( ! empty( $args['where']['message'] ) ) {
            $args['where']['message'] = [
                'field'   => 'message',
                'compare' => 'LIKE',
                'value'   => "'%" . $args['where']['message'] . "%'",
            ];
        }

		// Filter Client Messages
		if ( ! Helper\is_current_user_admin() ) {
			// Get All Client Conversations
			$client_conversations = Conversation_Model::get_items([
				'where' => [
					'created_by' => Helper\get_current_user_email(),
				]
			]);

			if ( empty( $client_conversations ) ) {
				return $this->response( true, [] );
			}

			$client_conversations = array_map( function( $conversation ) { return $conversation['id']; }, $client_conversations );
			$client_conversations = implode( ',', $client_conversations );

			$args['where']['conversation_id'] = [
                'field'   => 'conversation_id',
                'compare' => 'IN',
                'value'   => '(' . $client_conversations . ')',
            ];
		}

        $data = Message_Model::get_items( $args );

        if ( empty( $data ) ) {
            return $this->response( true, [] );
        }

        // Prepare items for response
        foreach ( $data as $key => $value ) {
            $item = $this->prepare_message_item_for_response( $value, $args );

            if ( empty( $item ) ) {
                continue;
            }

            $data[ $key ] = $item;
        }

        return $this->response( true, $data );
    }

    /**
     * Get Item
     *
     * @param object $request
     * @return array|WP_Error Response
     */
    public function get_item( $request )
    {
        $args = $request->get_params();
        $id   = (int) $args['id'];

        $success = false;
		$data = Message_Model::get_item( $id );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

		// Validate Client Capability
		if ( ! $this->can_current_user_view_conversation( $data['conversation_id'] ) ) {
			return new WP_Error( 403, __( 'You are not allowed to view the resource.' ) );
		}

        $success = true;
        $data    = $this->prepare_message_item_for_response( $data, $args );

        return $this->response( $success, $data );
    }

    /**
     * Create Item
     *
     * @param $request
     * @return array Response
     */
    public function create_item( $request )
    {
        $args = $request->get_params();
		$args['user_email'] = ! empty( $args['user_email'] ) ? $args['user_email'] : Helper\get_current_user_email();

		$args = apply_filters( 'helpgent_message_insert_args', $args );

		$conversation_id = ( ! empty( $args['conversation_id'] ) ) ? $args['conversation_id'] : 0;

		// Validate Client Capability
		if ( ! $this->can_current_user_view_conversation( $conversation_id ) ) {
			return new WP_Error( 403, __( 'You are not allowed to perform this action.' ) );
		}

		/**
         * Fires before creating an item
		 *
         * @since 1.0
         */
        do_action( 'helpgent_before_message_insert', $args );

        $data = Message_Model::create_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

		/**
         * Fires after creating an item
		 *
         * @since 1.0
         */
        do_action( 'helpgent_after_message_insert', $data, $args );

        $data    = $this->prepare_message_item_for_response( $data, $args );
        $success = true;

        return $this->response($success, $data);
    }

    /**
     * @param $request
     * @return mixed
     */
    public function update_item( $request )
    {
		$args = $request->get_params();
		$id   = ( int ) $args['id'];

		$old_data = Message_Model::get_item( $id );

		if ( is_wp_error( $old_data ) ) {
			return $old_data;
		}

		// Validate Capability
		if ( ! Helper\is_current_user_admin() || ( int ) $old_data['user_email'] !== Helper\get_current_user_email() ) {
			return new WP_Error( 403, __( 'You are not allowed to update the resource.' ) );
		}

		$args = $request->get_params();
		$args = apply_filters( 'helpgent_message_update_args', $args );

		/**
         * Fires before updating an item
		 *
         * @since 1.0
         */
        do_action( 'helpgent_before_message_update', $args );

        $data = Message_Model::update_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

		/**
         * Fires after updating an item
		 *
         * @since 1.0
         */
        do_action( 'helpgent_after_message_update', $data, $args );

        $data    = $this->prepare_message_item_for_response( $data, $args );
        $success = true;

        return $this->response( $success, $data );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function delete_item( $request )
    {
		$args = $request->get_params();
		$id   = ( int ) $args['id'];

		$old_data = Message_Model::get_item( $id );

		if ( is_wp_error( $old_data ) ) {
			return $old_data;
		}

		// Validate Capability
		if ( ! Helper\is_current_user_admin() || ( int ) $old_data['user_email'] !== Helper\get_current_user_email() ) {
			return new WP_Error( 403, __( 'You are not allowed to delete the resource.' ) );
		}

        $operation = Message_Model::delete_item( $args['id'] );

        if ( is_wp_error( $operation ) ) {
            return $operation;
        }

        return $this->response(true);
    }

	/**
	 * Can Current User View Conversation
	 *
	 * @param string $conversation_id
	 * @return bool
	 */
	public function can_current_user_view_conversation( $conversation_id ) {

		if ( Helper\is_current_user_admin() ) {
			return true;
		}

		// Get All Client Conversations
		$client_conversations = Conversation_Model::get_items([
			'where' => [
				'created_by' => Helper\get_current_user_email(),
			]
		]);

		if ( empty( $client_conversations ) ) {
			return new WP_Error( 403, __( 'You are not allowed to perform this action.' ) );
		}

		$client_conversations = array_map( function( $conversations ) { return $conversations['id']; }, $client_conversations );
		$can_view_message     = in_array( $conversation_id, $client_conversations );

		return $can_view_message;
	}

    /**
     * Prepare message item for response
     *
     * @param array $item    WordPress representation of the item.
     * @param array $request_params Request params.
     *
     * @return WP_REST_Response|null Response object on success, or null object on failure.
     */
    public function prepare_message_item_for_response( $item, $request_params )
    {
        $request_params['sanitize_schema'] = $this->get_sanitize_schema();

        // Add Author Data
        if ( ! empty( $item['user_email'] ) ) {
            $users = Helper\get_users_data_by( 'email', [ $item['user_email'] ] );
            $item['user'] = ( ! empty( $users ) ) ? $users[0] : null;
        }

        // Add Attachment URL
        if ( ! empty( $item['attachment_id'] ) ) {
            $attachment = Attachment_Model::get_item($item['attachment_id']);

            if ( is_wp_error( $attachment ) ) {
                $item['attachment_id']  = null;
                $item['attachment_url'] = null;
            } else {
                $item['attachment_url'] = Helper\get_attachment_link( $attachment['id'] );
            }
        }

        return $this->prepare_item_for_response( $item, $request_params );
    }

    /**
     * Get sanitize schema
     *
     * @return array
     */
    public function get_sanitize_schema()
    {
        return [
            'integer'    => ['id', 'conversation_id', 'attachment_id'],
            'datetime'   => ['created_at', 'updated_at'],
        ];
    }
}
