<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Rest_API\Version_1;

use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Term_Relationship_Model;

class Tags extends Rest_Base {

    /**
     * Rest Base
     * 
     * @var string
     */
    public $rest_base = 'messages/tags';

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
                        'order'       => [
                            'default'           => 'latest',
                            'validate_callback' => [ $this, 'validate_order' ],
                        ],
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'create_item' ],
                    'permission_callback' => [ $this, 'check_user_permission' ],
                    'args'                => [
                        'message_id' => [
                            'required'          => true,
                            'validate_callback' => [ $this, 'validate_int' ],
                        ],
                        'term_id' => [
                            'required'          => true,
                            'validate_callback' => [ $this, 'validate_int' ],
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
                    'permission_callback' => [ $this, 'check_user_permission' ],
                    'args'                => [],
                ],
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'update_item' ],
                    'permission_callback' => [ $this, 'check_user_permission' ],
                    'args'                => [
                        'message_id' => [
                            'required'          => false,
                            'validate_callback' => [ $this, 'validate_int' ],
                        ],
                        'term_id' => [
                            'required'          => false,
                            'validate_callback' => [ $this, 'validate_int' ],
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

        $args['taxonomy'] = 'tag';

        $data = Message_Term_Relationship_Model::get_items( $args );

        if ( empty( $data ) ) {
            return $this->response( true, [] );
        }

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
        
        if ( ! empty( $data ) ) {
            $success = true;
            $data    = $this->prepare_item_for_response( $data, $args );
        }

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

        $params_map = [
            'message_id' => 'object_id',
            'term_id'    => 'term_taxonomy_id',
        ];

        $model_args = [];

        // Parse Args
        foreach( $params_map as $key => $value ) {
            
            if ( empty( $args[ $key ] ) ) {
                continue;
            }

            $model_args[ $value ] = $args[ $key ];

        }

        $data = Message_Term_Relationship_Model::create_item( $model_args );

        return $data;

        $data    = ( ! empty( $data ) ) ? $this->prepare_item_for_response( $data, $args ) : null;
        $success = ! empty( $data ) ? true : false;

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
        $data = ( ! empty( $data ) ) ? $this->prepare_item_for_response( $data, $args ) : null;

        $success = ! empty( $data ) ? true : false;

        return $this->response( $success, $data );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function delete_item( $request ) {
        $args = $request->get_params();

        $operation = Message_Model::delete_item( $args['id'] );
        $success   = $operation ? true : false;

        return $this->response( $success );
    }

    /**
     * Prepare item for response
     * 
     * @return array
     */
    public function prepare_item_for_response( $item = [], $args = [] ) {

        if ( ! is_array( $item ) || empty( $item ) ) {
            return null;
        }

        $integer_fields    = [ 'id', 'user_id', 'attachment_id' ];
        $serialized_fields = [ 'seen_by' ];
        $date_fields       = [ 'created_on', 'updated_on' ];

        
        // Sanitize Fields
        foreach ( $item as $key => $value ) {

            // Sanitize Integer Fields
            if ( in_array( $key, $integer_fields ) ) {
                $item[ $key ] = ( ! empty( $item[ $key ] ) && is_numeric( $item[ $key ] ) ) ? (int) $item[ $key ] : null;
            }

            // Sanitize Serialized Fields
            else if ( in_array( $key, $serialized_fields ) ) {
                $item[ $key ] = ( ! empty( $item[ $key ] ) ) ? maybe_unserialize( $value ) : null;
            }

            // Sanitize Date Fields
            else if ( in_array( $key, $date_fields ) ) {
                $formatted_key = $key . '_formatted';
                $timezone      = ( ! empty( $args['timezone'] ) ) ? $args['timezone'] : null;

                $item[ $formatted_key ] = ( ! empty( $item[ $key ] ) ) ? esc_html( $this->get_formatted_time( $item[ $key ], $timezone ) ) : null;
            }
            
            else {
                $item[ $key ] = esc_html( $value );
            }

        }

        return $item;
    }

}
