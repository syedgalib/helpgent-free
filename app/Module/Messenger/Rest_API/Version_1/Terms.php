<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Rest_API\Version_1;

use WPWaxCustomerSupportApp\Module\Messenger\Model\Term_Model;

class Terms extends Rest_Base {

    /**
     * Rest Base
     *
     * @var string
     */
    public $rest_base = 'messages/terms';

    public function register_routes() {

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items' ],
                    'permission_callback' => [ $this, 'check_auth_permission' ],
                    'args'                => [
                        'timezone' => [
                            'default'           => '',
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'page' => [
                            'default'           => 1,
                            'validate_callback' => [ $this, 'validate_int' ],
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
                        'taxonomy' => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'parent' => [
                            'default'           => 0,
                            'validate_callback' => [ $this, 'validate_int' ],
                        ],
                    ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<term_id>[\d]+)',
            [
                'args' => [
                    'form_id' => [
                        'type' => 'integer',
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_item' ],
                    'permission_callback' => [ $this, 'check_auth_permission' ],
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
                        'name' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'taxonomy' => [
                            'required'          => false,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'parent' => [
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
     * Get Items
     *
     * @param $request
     * @return array Response
     */
    public function get_items( $request ) {
        $args = $request->get_params();
        $data = Term_Model::get_items( $args );

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
        $id   = (int) $args['term_id'];

        $success = false;
        $data    = Term_Model::get_item( $id );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

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
        $default_args = [];

        $args = array_merge( $default_args, $args );
        $data = Term_Model::create_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

        return $data;

        $data = ( ! empty( $data ) ) ? $this->prepare_item_for_response( $data, $args ) : null;
        $success = ! empty( $data ) ? true : false;

        return $this->response( $success, $data );
    }

    /**
     * Update Item
     *
     * @param $request
     * @return array Response
     */
    public function update_item( $request ) {
        $args = $request->get_params();

        $data = Term_Model::update_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

        $data = ( ! empty( $data ) ) ? $this->prepare_item_for_response( $data, $args ) : null;
        $success = ! empty( $data ) ? true : false;

        return $this->response( $success, $data );
    }

    /**
     * Delete Item
     *
     * @param $request
     * @return array Response
     */
    public function delete_item( $request ) {
        $args = $request->get_params();

        $operation = Term_Model::delete_item( $args['term_id'] );

        if ( is_wp_error( $operation ) ) {
            return $operation;
        }

        return $this->response( true );
    }

}
