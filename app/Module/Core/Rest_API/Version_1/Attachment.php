<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;

use WPWaxCustomerSupportApp\Module\Core\Model\Attachment_Model;
use WPWaxCustomerSupportApp\Root\Helper;

class Attachment extends Rest_Base {

    /**
     * Rest Base
     * 
     * @var string
     */
    public $rest_base = 'attachments';

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
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'create_item' ],
                    'permission_callback' => [ $this, 'check_user_permission' ],
                    'args'                => [
                        
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
    public function validate_order( $value ) {
        return in_array( $value, [ 'latest', 'oldest' ] );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function get_items( $request ) {
        $args = $request->get_params();
        $data = Attachment_Model::get_items( $args );

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
        $data    = Attachment_Model::get_item( $id );
        
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
        $default_args = [];

        $default_args['link']       = '';
        $default_args['title']      = '';
        $default_args['expires_on'] = null;

        $args = array_merge( $default_args, $args );

        if ( ! isset( $_FILES['file'] ) && empty( $args['link'] ) ) {
            $message = __( 'Required file or link is missing', 'wpwax-customer-support-app' );
            return $this->response( false, null, $message );
        }

        if ( isset( $_FILES['file'] ) ) {
            $file = Helper\handle_media_upload( $_FILES['file'] );

            if ( ! empty( $file['error'] ) ) {
                return $this->response( false, null, $file['error'] );
            }

            if ( empty( $args['title'] ) ) {
                $file_name = $_FILES['file']['name'];
                $args['title'] = preg_replace( '/\..+$/', '', $file_name );
            }

            $args['link']       = $file['url'];
            $args['media_type'] = $file['type'];
        }

        $data = Attachment_Model::create_item( $args );
        $data = ( ! empty( $data ) ) ? $this->prepare_item_for_response( $data, $args ) : null;
    
        $success = ! empty( $data ) ? true : false;

        return $this->response( $success, $data );
    }

    /**
     * @param $request
     * @return mixed
     */
    public function update_item( $request ) {
        $args = $request->get_params();

        $data = Attachment_Model::update_item( $args );
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

        $operation = Attachment_Model::delete_item( $args['id'] );
        $success   = $operation ? true : false;

        return $this->response( $success );
    }

}
