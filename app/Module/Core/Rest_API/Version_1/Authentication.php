<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;

use WP_Error;
use WPWaxCustomerSupportApp\Module\Core\Model\Auth_Token_Model;
use WPWaxCustomerSupportApp\Base\Helper;

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
                    'permission_callback' => '__return_true',
                    'args'                => [
                        'email' => [
                            'type'              => 'string',
                            'sanitize_callback' => 'sanitize_email',
                        ],
						'password' => [
							'type' => 'string',
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
                    'permission_callback' => '__return_true',
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

		$email    = ( ! empty( $args['email'] ) ) ? $args['email'] : '';
		$password = ( ! empty( $args['password'] ) ) ? $args['password'] : '';

		$wp_user = get_user_by( 'email', $email );

		if ( $wp_user ) {
			if ( empty( $password ) ) {
				$message = __( 'Password is required.', 'wpwax-customer-support-app' );
            	return new WP_Error( 403, $message );
			}

			$has_valid_password = wp_check_password( $password, $wp_user->user_pass, $wp_user->ID );

			if ( ! $has_valid_password ) {
				$message = __( 'Password is incorrect.', 'wpwax-customer-support-app' );
            	return new WP_Error( 403, $message );
			}
		}

		$token = Auth_Token_Model::create_token( $email );

		if ( is_wp_error( $token ) ) {
			return $token;
		}

		$message = __( 'The token is generated successfuly. Please check your email.', 'wpwax-customer-support-app' );
		$data    = ( $wp_user ) ? $token : '';

        return $this->response( true, $data, $message );
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

		if ( empty( $email ) ) {
			$message = __( 'Email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		if ( empty( $token ) ) {
			$message = __( 'Token is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		$status = Auth_Token_Model::has_valid_token( $email, $token );

		return $this->response( $status, null );
    }

}
