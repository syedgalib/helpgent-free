<?php
/**
 * @author  wpWax
 */

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;

use WPWaxCustomerSupportApp\DB\DB;

class Forms extends Base {

    public function __construct() {
        $this->rest_base = 'forms';
        parent::__construct();
    }

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
                        'name'    => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'options' => [
                            'default'           => '',
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                    ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<form_id>[\d]+)',
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
                ],
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'update_item' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                    'args'                => [
                        'name'    => [
                            'default'           => '',
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'options' => [
                            'default'           => '',
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
     * @param $request
     * @return mixed
     */
    public function get_items( $request ) {
        $args = $request->get_params();
        $data = DB::get_forms( $args['page'] );

        $rest_data = array_map(
            function ( $item ) {
                $result = [
                    'form_id' => esc_html( $item['form_id'] ),
                    'name'    => esc_html( $item['name'] ),
                ];

                return $result;
            },
            $data
        );

        return $this->response( true, $rest_data );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function get_item( $request ) {
        $args = $request->get_params();
        $data = DB::get_form( $args['form_id'] );

        if ( $data ) {
            $success   = true;
            $rest_data = [
                'form_id' => esc_html( $data['form_id'] ),
                'name'    => esc_html( $data['name'] ),
                'options' => maybe_unserialize( $data['options'] ),
            ];

        } else {
            $success   = false;
            $rest_data = [];
        }

        return $this->response( $success, $rest_data );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function create_item( $request ) {
        $args    = $request->get_params();
        $data    = DB::create_form( $args );
        $success = $data ? true : false;

        return $this->response( $success, $data );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function update_item( $request ) {
        $args      = $request->get_params();
        $operation = DB::update_form( $args );
        $success   = ( false === $operation ) ? false : true;

        return $this->response( $success );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function delete_item( $request ) {
        $args      = $request->get_params();
        $operation = DB::delete_form( $args['form_id'] );
        $success   = $operation ? true : false;

        return $this->response( $success );
    }

}
