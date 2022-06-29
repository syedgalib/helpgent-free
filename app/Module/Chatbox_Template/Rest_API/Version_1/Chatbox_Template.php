<?php

namespace WPWaxCustomerSupportApp\Module\Chatbox_Template\Rest_API\Version_1;

use \WP_REST_Response;
use WPWaxCustomerSupportApp\Module\Chatbox_Template\Model\CB_Template_Model;
use WPWaxCustomerSupportApp\Base\Helper;

class Chatbox_Template extends Rest_Base {

    /**
     * Rest Base
     * 
     * @var string
     */
    public $rest_base = 'chatbox-templates';

    public function register_routes() {

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items' ],
                    'permission_callback' => [ $this, 'check_guest_permission' ],
                    'args'                => [
                        'page'        => [
                            'default'           => 1,
                            'validate_callback' => [ $this, 'validate_int' ],
                        ],
                        'return_default_if_result_empty' => [
                            'type'    => 'boolean',
                            'default' => false,
                        ],
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'create_item' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                    'args'                => [
                        'name' => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'page_ids' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'is_default' => [
                            'type'    => 'boolean',
                            'default' => false,
                        ],
                        'options' => [
                            'required'          => true,
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
                    'id' => [
                        'type' => 'integer',
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_item' ],
                    'permission_callback' => [ $this, 'check_guest_permission' ],
                    'args'                => [],
                ],
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'update_item' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                    'args'                => [
                        'name' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'page_ids' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'is_default' => [
                            'type'    => 'boolean',
                            'default' => false,
                        ],
                        'options' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
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

        $where['id']         = '';
        $where['name']       = '';
        $where['page_id']    = '';
        $where['is_default'] = '';

        $where = Helper\filter_params( $where, $args );

        if ( isset( $where['is_default'] ) ) {
            $where['is_default'] = ( Helper\is_truthy( $where['is_default'] ) ) ? 1 : 0;
        }

        $default = [];

        $default['limit']                          = 20;
        $default['page']                           = 1;
        $default['return_default_if_result_empty'] = false;

        $args = Helper\filter_params( $default, $args );
        $args['where'] = $where;

        $data = CB_Template_Model::get_items( $args );

        if ( empty( $data ) && Helper\is_truthy( $args['return_default_if_result_empty'] ) ) {
            $data = CB_Template_Model::get_items( [ 'where' => [ 'is_default' => true ] ] );
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
        $data    = CB_Template_Model::get_item( $id );

        if ( is_wp_error( $data ) ) {
            return new WP_REST_Response(
                [ 'success' => false, 'message' => $data->get_error_message() ], 
                $data->get_error_code() 
            );
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

        $default = [];
    
        $default['id']         = '';
        $default['name']       = '';
        $default['page_ids']   = '';
        $default['is_default'] = false;
        $default['options']    = '';

        $args = Helper\filter_params( $default, $args );
        $data = CB_Template_Model::create_item( $args );

        if ( is_wp_error( $data ) ) {
            return new WP_REST_Response(
                [ 'success' => false, 'message' => $data->get_error_message() ], 
                $data->get_error_code() 
            );
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

        $default['id']         = '';
        $default['name']       = '';
        $default['page_ids']   = '';
        $default['is_default'] = false;
        $default['options']    = '';

        $args = Helper\filter_params( $default, $args );
        $data = CB_Template_Model::update_item( $args );

        if ( is_wp_error( $data ) ) {
            return new WP_REST_Response(
                [ 'success' => false, 'message' => $data->get_error_message() ], 
                $data->get_error_code() 
            );
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

        $operation = CB_Template_Model::delete_item( $args['id'] );

        return $this->response( $operation );
    }

    /**
     * Get sanitize schema
     * 
     * @return array
     */
    public function get_sanitize_schema() {
        return [
            'string'  => [ 'name' ],
            'integer' => [ 'id', 'page_id' ],
            'boolean' => [ 'is_default' ],
            'json'    => [ 'options' ],
        ];
    }

}
