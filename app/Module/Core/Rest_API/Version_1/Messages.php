<?php
/**
 * @author  wpWax
 */

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;

use WPWaxCustomerSupportApp\Module\Core\Rest_API\Helper\Rest_Base;
use WPWaxCustomerSupportApp\Model\DB\DB;

class Messages extends Rest_Base {

    public function __construct() {
        $this->rest_base = 'messages';
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
                        'timezone'    => [
                            'default'           => '',
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'page'        => [
                            'default'           => 1,
                            'validate_callback' => [ $this, 'validate_int' ],
                        ],
                        'read_status' => [
                            'default'           => 'all',
                            'validate_callback' => [ $this, 'validate_read_status' ],
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
                        'name'          => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'email'         => [
                            'required'          => true,
                            'validate_callback' => [ $this, 'validate_email' ],
                            'sanitize_email'    => 'sanitize_text_field',
                        ],
                        'message_type'  => [
                            'required'          => true,
                            'validate_callback' => [ $this, 'validate_message_type' ],
                        ],
                        'message_value' => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_textarea_field',
                        ],
                    ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<message_id>[\d]+)',
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
                    'permission_callback' => [ $this, 'check_user_permission' ],
                    'args'                => [
                        'message_by'    => [
                            'required'          => true,
                            'validate_callback' => [ $this, 'validate_message_by' ],
                        ],
                        'message_type'  => [
                            'required'          => true,
                            'validate_callback' => [ $this, 'validate_message_type' ],
                        ],
                        'message_value' => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_textarea_field',
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
    public function validate_message_by( $value ) {
        return in_array( $value, [ 'user', 'admin' ] );
    }

    /**
     * @param $value
     */
    public function validate_read_status( $value ) {
        return in_array( $value, [ 'all', 'read', 'unread' ] );
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
        $data = DB::get_messages( $args );

        $rest_data = array_map(
            function ( $item ) use ( $args ) {
                $result = [
                    'message_id'      => esc_html( $item['message_id'] ),
                    'name'            => esc_html( $item['name'] ),
                    'updated_time'    => esc_html( $this->get_formatted_time( $item['updated_time'], $args['timezone'] ) ),
                    'last_message_by' => esc_html( $item['last_message_by'] ),
                    'is_read'         => esc_html( $item['is_read'] ),
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
        $data = DB::get_message( $args['message_id'] );

        if ( $data ) {
            $success = true;

            $rest_data = [
                'message_id'           => esc_html( $data['message_id'] ),
                'name'                 => esc_html( $data['name'] ),
                'avatar'               => esc_url( get_avatar_url( $data['email'] ) ),
                'last_message_by'      => esc_html( $data['last_message_by'] ),
                'last_message_time'    => esc_html( $this->get_formatted_time( $data['updated_time'], $args['timezone'] ) ),
                'last_message_is_read' => esc_html( $data['is_read'] ),
            ];

            $messages = maybe_unserialize( $data['messages'] );

            $rest_data['messages'] = array_map(
                function ( $item ) use ( $args ) {
                    $result = [
                        'by'    => esc_html( $item['by'] ),
                        'time'  => esc_html( $this->get_formatted_time( $item['time'], $args['timezone'] ) ),
                        'type'  => esc_html( $item['type'] ),
                        'value' => esc_html( $item['value'] ),
                    ];

                    return $result;
                },
                $messages
            );
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
        $data    = DB::create_message( $args );
        $success = $data ? true : false;

        return $this->response( $success, $data );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function update_item( $request ) {
        $args      = $request->get_params();
        $operation = DB::update_message( $args );
        $success   = ( false === $operation ) ? false : true;

        return $this->response( $success );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function delete_item( $request ) {
        $args      = $request->get_params();
        $operation = DB::delete_message( $args['message_id'] );
        $success   = $operation ? true : false;

        return $this->response( $success );
    }

    /**
     * @param $time
     * @param $timezone
     */
    private function get_formatted_time( $time, $timezone ) {
        $timezone  = $timezone ? $timezone : wp_timezone_string();
        $timezone  = new \DateTimeZone( $timezone );
        $timestamp = strtotime( $time );

        return wp_date( 'j M y @ G:i', $timestamp, $timezone );
    }

}
