<?php

namespace WPWaxCustomerSupportApp\Module\Settings_Panel\Rest_API\Version_1;

use WPWaxCustomerSupportApp\Base\Helper;

class Settings_Panel extends Rest_Base {

    /**
     * Rest Base
     *
     * @var string
     */
    public $rest_base = 'settings';

    public function register_routes() {

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [ $this, 'get_items' ],
                    'permission_callback' => [ $this, 'check_guest_permission' ],
                ],
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'create_update_items' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                ],
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [ $this, 'delete_items' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                ],
            ]
        );

    }

    /**
	 * Get Items
	 *
     * @param $request
     * @return mixed
     */
    public function get_items( $request ) {
		$data = Helper\get_options();

        return $this->response( true, $data );
    }

    /**
     * Create or Update Items
     *
     * @param $request
     * @return array Response
     */
    public function create_update_items( $request ) {
        $args = $request->get_params();
		$data = Helper\get_options();

        if ( empty( $args ) ) {
            return $this->response( true, $data );
        }

		$data = Helper\update_options( $args );

        return $this->response( true, $args );
    }

    /**
	 * Delete Items
	 *
     * @param $request
     * @return mixed
     */
    public function delete_items( $request ) {
        $args = $request->get_params();
		$data = Helper\get_options();

        if ( empty( $args ) ) {
            return $this->response( true, $data );
        }

		$data = Helper\delete_options( array_keys( $args ) );

        return $this->response( true, $data );
    }

}
