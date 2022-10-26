<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;
use WPWaxCustomerSupportApp\Module\Core\Model\Auth_Token_Model;

class Authentication extends Rest_Base {

    /**
     * Rest Base
     *
     * @var string
     */
    public $rest_base = 'authentication';

    public function register_routes() {

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/token',
            [
                'args' => [
                    'email' => [
                        'type' => 'string',
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'create_token' ],
                    'permission_callback' => [ $this, 'check_guest_permission' ],
                    'args'                => [
                        'expires_on' => [
                            'type'    => 'date-time',
                            'default' => null,
                        ],
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [ $this, 'delete_token' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/token/validate',
            [
                'args' => [
                    'email' => [
                        'type' => 'string',
                    ],
                    'token' => [
                        'type' => 'string',
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'validate_token' ],
                    'permission_callback' => [ $this, 'check_guest_permission' ],
                ],
            ]
        );

    }

    /**
     * Create Token
     *
     * @param $request
     * @return array Response
     */
    public function create_token( $request ) {
        $args = $request->get_params();

		$email = ( ! empty( $args['email'] ) ) ? $args['email'] : '';

		$token = Auth_Token_Model::create_token( $email );

		if ( is_wp_error( $token ) ) {
			return $token;
		}

        return $this->response( true, $token );
    }

    /**
     * Validate Token
     *
     * @param $request
     * @return array Response
     */
    public function validate_token( $request ) {
        $args = $request->get_params();

		$email = ( ! empty( $args['email'] ) ) ? $args['email'] : '';
		$token = ( ! empty( $args['token'] ) ) ? $args['token'] : '';

		$status = Auth_Token_Model::has_valid_token( $email, $token );

		return $this->response( $status, null );
    }

}
