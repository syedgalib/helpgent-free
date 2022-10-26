<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;

use WPWaxCustomerSupportApp\Module\Core\Model\Attachment_Model;
use WPWaxCustomerSupportApp\Base\Helper;

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
                    'permission_callback' => [ $this, 'check_guest_permission' ],
                    'args'                => [
                        'file' => [
                            'required' => false,
                        ],
                        'link' => [
                            'type'              => 'string',
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'title' => [
                            'type'              => 'string',
                            'default'           => '',
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'expires_on' => [
                            'type'    => 'date-time',
                            'default' => null,
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
                        'expires_on' => [
                            'type'    => 'date-time',
                            'default' => null,
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
     * Validate Order
     *
     * @param $value
     * @return array
     */
    public function validate_order( $value ) {
        return in_array( $value, [ 'latest', 'oldest' ] );
    }

    /**
     * Get Items
     *
     * @param $request
     * @return array Response
     */
    public function get_items( $request ) {
        $args = $request->get_params();
        $data = Attachment_Model::get_items( $args );

        if ( empty( $data ) ) {
            return $this->response( true, [] );
        }

        // Prepare items for response
        foreach ( $data as $key => $value ) {
            $item = $this->prepare_attachment_item_for_response( $value, $args );

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

        if ( is_wp_error( $data ) ) {
            return $data;
        }

        $success = true;
        $data    = $this->prepare_attachment_item_for_response( $data, $args );

        return $this->response( $success, $data );
    }

	/**
     * Prepare attachment item for response
     *
	 * @param array $item WordPress representation of the item.
	 * @param array $request_params Request params.
     *
	 * @return WP_REST_Response|null Response object on success, or null object on failure.
     */
	public function prepare_attachment_item_for_response( $data, $args ) {

		$data['link'] = Helper\get_attachment_link( $data['id'] );

		return $this->prepare_item_for_response( $data, $args );
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

        if ( isset( $_FILES['file'] ) ) {
            $args['file'] = $_FILES['file'];
			$args['file']['name'] = uniqid( 'attachment_', true );
			$check_ext = wp_check_filetype_and_ext( $args['file'], $args['file']['name'] );

			if ( empty( $check_ext['ext'] ) ) {
				$type = $args['file']['type'];
				$ext  = preg_replace( "/\w+[\/]/", '', $type );
				$args['file']['name'] = $args['file']['name'] . '.' . $ext;
			}

        }

        $data = Attachment_Model::create_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

        $data = ( ! empty( $data ) ) ? $this->prepare_attachment_item_for_response( $data, $args ) : null;
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

        $default = [];

        $default['id']         = 0;
        $default['title']      = '';
        $default['link']       = '';
        $default['expires_on'] = null;

        $args = Helper\filter_params( $default , $args );

        $data = Attachment_Model::update_item( $args );

        if ( is_wp_error( $data ) ) {
            return $data;
        }

        $data = ( ! empty( $data ) ) ? $this->prepare_attachment_item_for_response( $data, $args ) : null;
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

        $operation = Attachment_Model::delete_item( $args['id'] );

        if ( is_wp_error( $operation ) ) {
            return $operation;
        }

        return $this->response( true );
    }

}
