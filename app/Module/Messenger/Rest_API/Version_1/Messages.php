<?php

namespace HelpGent\Module\Messenger\Rest_API\Version_1;

use WP_Error;
use HelpGent\Module\Messenger\Model\Message_Model;
use HelpGent\Base\Helper;
use HelpGent\Module\Core\Model\Attachment_Model;
use HelpGent\Module\Messenger\Model\Conversation_Model;

class Messages extends Rest_Base {

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
                            'sanitize_callback' => 'sanitize_textarea_field',
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

        $where['id']              = '';
        $where['conversation_id'] = '';
        $where['user_email']      = '';
        $where['message']         = '';
        $where['message_type']    = '';
        $where['parent']          = '';
        $where['parent_type']     = '';
        $where['updated_at']      = '';
        $where['created_at']      = '';

        $where = Helper\filter_params($where, $args);

        $default = [];

        $default['limit']    = 20;
        $default['page']     = 1;
        $default['group_by'] = null;
        $default['order_by'] = null;
        $default['timezone'] = null;

        $default['id_compare'] = '=';

        $args = Helper\merge_params( $default, $args );

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

        if ( ! empty( $args['where']['id'] ) ) {
            $args['where']['id'] = [
                'key'     => 'id',
                'compare' => $args['id_compare'],
                'value'   => $args['where']['id'],
            ];
        }

        // Filter By Message
        if ( ! empty( $args['where']['message'] ) ) {
            $args['where']['message'] = [
                'key'     => 'message',
                'compare' => 'LIKE',
                'value'   => $args['where']['message'],
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

			$client_conversation_list = array_map( function( $conversation ) { return $conversation['id']; }, $client_conversations );
			$client_conversations     = implode( ',', $client_conversation_list );

			if ( ! empty( $args['where']['conversation_id'] ) ) {
				$args['where']['conversation_id'] = [
					'key'     => 'conversation_id',
					'compare' => '=',
					'value'   => in_array( $args['where']['conversation_id'], $client_conversation_list ) ? $args['where']['conversation_id'] : 0,
				];
			} else {
				$args['where']['conversation_id'] = [
					'key'     => 'conversation_id',
					'compare' => 'IN',
					'value'   => $client_conversations,
				];
			}

		}

		if ( isset( $args['timezone'] ) ) {
			unset( $args['timezone'] );
		}

        $data    = Message_Model::get_items( $args );
        $results = $data['results'];

        if ( empty( $results ) ) {
            return $this->response( true, [] );
        }

        // Prepare items for response
        foreach ( $results as $key => $value ) {
            $item = $this->prepare_message_item_for_response( $value, $args );

            if ( empty( $item ) ) {
                continue;
            }

            $results[ $key ] = $item;
        }

		$headers = [
            'X-WP-Total'      => $data['found_items'],
            'X-WP-TotalPages' => $data['total_pages'],
        ];

        return $this->response( true, $results, '', $headers );
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
		if ( ! Helper\current_user_can_view_conversation( $data['conversation_id'] ) ) {
			return new WP_Error( 403, __( 'You are not allowed to view the resource.', 'helpgent' ) );
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

		// Validate Capability
		$is_guest = Helper\is_user_guest( $args['user_email'] );

		if ( ! Helper\current_user_can_view_conversation( $conversation_id ) && ! $is_guest ) {
			return new WP_Error( 403, __( '@ You are not allowed to perform this action.', 'helpgent' ) );
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
        do_action( 'helpgent_after_message_inserted', $data, $args );

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
		$is_admin  = Helper\is_current_user_admin();
		$is_author = $old_data['user_email'] === Helper\get_current_user_email();

		if ( ! ( $is_admin || $is_author ) ) {
			return new WP_Error( 403, __( 'You are not allowed to update the resource.', 'helpgent' ) );
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
		$is_admin  = Helper\is_current_user_admin();
		$is_author = $old_data['user_email'] === Helper\get_current_user_email();

		if ( ! ( $is_admin || $is_author ) ) {
			return new WP_Error( 403, __( 'You are not allowed to delete the resource.', 'helpgent' ) );
		}

        $operation = Message_Model::delete_item( $args['id'] );

        if ( is_wp_error( $operation ) ) {
            return $operation;
        }

        return $this->response(true);
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
