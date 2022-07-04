<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Rest_API\Version_1;

use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;
use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Session_Term_Relationship_Model;

class Messages extends Rest_Base {

    /**
     * Rest Base
     * 
     * @var string
     */
    public $rest_base = 'messages';

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
                        'timezone'    => [
                            'default'           => '',
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'page'        => [
                            'default'           => 1,
                            'validate_callback' => [ $this, 'validate_int' ],
                        ],
                        'order'       => [
                            'default'           => 'latest',
                            'validate_callback' => [ $this, 'validate_order' ],
                        ],
                        'session_id'  => [
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'create_item' ],
                    'permission_callback' => [ $this, 'check_guest_permission' ],
                    'args'                => [
                        'user_id'         => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'user_full_name' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'email' => [
                            'required'          => false,
                            'validate_callback' => [ $this, 'validate_email' ],
                            'sanitize_callback' => 'sanitize_email',
                        ],
                        'message' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'note' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'attachment_id' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'message_type' => [
                            'required'          => false,
                            'validate_callback' => [ $this, 'validate_message_type' ],
                        ],
                        'seen_by' => [
                            'required' => false,
                        ],
                        'terms' => [
                            'type'              => 'string',
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
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
                    'callback'            => [ $this, 'get_item' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                    'args'                => [
                        'timezone' => [
                            'default'           => '',
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'update_item' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                    'args'                => [
                        'user_id'         => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'user_full_name' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'email' => [
                            'required'          => false,
                            'validate_callback' => [ $this, 'validate_email' ],
                            'sanitize_callback' => 'sanitize_email',
                        ],
                        'message' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'note' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'attachment_id' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'message_type' => [
                            'required'          => false,
                            'validate_callback' => [ $this, 'validate_message_type' ],
                        ],
                        'seen_by' => [
                            'required' => false,
                        ],
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [ $this, 'delete_item' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                ],
            ]
        );

    }

    /**
     * @param $value
     */
    public function validate_message_type( $value ) {
        return in_array( $value, [ 'text', 'video', 'audio' ] );
    }

    /**
     * @param $value
     */
    public function validate_order( $value ) {
        return in_array( $value, [ 'latest', 'oldest' ] );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function get_items( $request ) {
        $args = $request->get_params();


        $where = [];
        $where['session_id'] = '';
        $where = Helper\filter_params( $where, $args );

        $default = [];

        $default['limit'] = 20;
        $default['page']  = 1;

        $args = Helper\filter_params( $default, $args );
        $args['where'] = $where;

        $data = Message_Model::get_items( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

        if ( empty( $data ) ) {
            return $this->response( true, [] );
        }

        $args['sanitize_schema'] = $this->get_sanitize_schema();

        // Prepare items for response
        foreach ( $data as $key => $value ) {
             $item = $this->prepare_item_for_response( $value, $args );

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
     * @return array Response
     */
    public function get_item( $request ) {
        $args = $request->get_params();
        $id   = (int) $args['id'];

        $success = false;
        $data    = Message_Model::get_item( $id );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

        $args['sanitize_schema'] = $this->get_sanitize_schema();
        
        $success = true;
        $data    = $this->prepare_item_for_response( $data, $args );

        return $this->response( $success, $data );
    }

    /**
     * Create Item
     * 
     * @param $request
     * @return array Response
     */
    public function create_item( $request ) {
        $args = $request->get_params();

        if ( ! empty( $args['seen_by'] ) ) {
            $args['seen_by'] = $this->convert_string_to_int_array( $args['seen_by'] );
        }

        $data = Message_Model::create_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

        // Assign Terms
        if ( isset( $args['terms'] ) ) {
            $terms = Helper\convert_string_to_int_array( $args['terms'] );
            foreach( $terms as $term_id ) {
                Session_Term_Relationship_Model::create_item([
                    'session_id' => $data['session_id'],
                    'term_id'    => $term_id,
                ]);
            }
        }

        $args['sanitize_schema'] = $this->get_sanitize_schema();

        $data    = $this->prepare_item_for_response( $data, $args );
        $success = true;

        return $this->response( $success, $data );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function update_item( $request ) {
        $args = $request->get_params();

        if ( ! empty( $args['seen_by'] ) ) {
            $args['seen_by'] = $this->convert_string_to_int_array( $args['seen_by'] );
        }

        $data = Message_Model::update_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

        $args['sanitize_schema'] = $this->get_sanitize_schema();

        $data    = $this->prepare_item_for_response( $data, $args );
        $success = true;

        return $this->response( $success, $data );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function delete_item( $request ) {
        $args = $request->get_params();

        $operation = Message_Model::delete_item( $args['id'] );

        if ( is_wp_error( $operation ) ) {
            return $operation;
        }

        return $this->response( true );
    }

    /**
     * Get sanitize schema
     * 
     * @return array
     */
    public function get_sanitize_schema() {
        return [
            'integer'    => [ 'id', 'user_id', 'attachment_id' ],
            'serialized' => [ 'seen_by' ],
            'datetime'   => [ 'created_on', 'updated_on' ],
        ];
    }

}
