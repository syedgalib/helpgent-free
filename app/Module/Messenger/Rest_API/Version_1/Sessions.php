<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Rest_API\Version_1;

use \WP_Error;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Session_Term_Relationship_Model;
use WPWaxCustomerSupportApp\Root\Helper;

class Sessions extends Rest_Base {

    /**
     * Rest Base
     * 
     * @var string
     */
    public $rest_base = 'sessions';

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
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\d]+)',
            [
                [
                    'methods'             => \WP_REST_Server::DELETABLE,
                    'callback'            => [ $this, 'delete_item' ],
                    'permission_callback' => [ $this, 'check_admin_permission' ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/add-terms',
            [
                [
                    'methods'             => \WP_REST_Server::CREATABLE,
                    'callback'            => [ $this, 'add_terms' ],
                    'permission_callback' => [ $this, 'check_user_permission' ],
                    'args'                => [
                        'session_id' => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'term_id' => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                    ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/remove-terms',
            [
                [
                    'methods'             => \WP_REST_Server::EDITABLE,
                    'callback'            => [ $this, 'remove_terms' ],
                    'permission_callback' => [ $this, 'check_user_permission' ],
                    'args'                => [
                        'session_id' => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                        'term_id' => [
                            'required'          => true,
                            'sanitize_callback' => 'sanitize_text_field',
                        ],
                    ],
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

        // Get session data
        $args = $request->get_params();

        $default = [];

        $args = array_merge( $default, $args );

        $args['group_by'] = 'session_id';
        $args['fields']   = [ 'session_id' ];

        $session_data = Message_Model::get_items( $args );

        if ( empty( $session_data ) ) {
            return $this->response( true, [] );
        }

        // Get users data
        $session_ids = array_map( function( $item ) {
            $session_id = $item['session_id'];
            return "'{$session_id}'";
        }, $session_data );

        $session_ids_as_string = implode( ',', $session_ids );
        $session_ids_as_string = trim( $session_ids_as_string, ', ' );

        $users_args = [];
        $users_args['fields'] = [ 'user_id', 'session_id' ];
        $users_args['where'] = [
            [
                'field'   => 'session_id',
                'compare' => 'IN',
                'value'   => "($session_ids_as_string)",
            ]
        ];

        $user_data = Message_Model::get_items( $users_args, false );

        if ( empty( $user_data ) ) {
            $message = __( 'Something went wrong.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        // Prepare user data
        $user_data = array_map( function( $item ) {
            $user = get_user_by( 'id', $item['user_id'] );

            if ( empty( $user ) ) {
                return [];
            }

            $avater = get_user_meta( $user->ID, '_wpwax_vm_avater', true );

            $user_data = [];

            $user_data['id']         = $user->ID;
            $user_data['name']       = $user->display_name;
            $user_data['avater']     = $avater;
            $user_data['session_id'] = $item['session_id'];

            return $user_data;

        }, $user_data );


        // Add users to session data
        $session_data = array_map(  function( $item ) use ( $user_data ) {
            
            $users = [];

            foreach( $user_data as $user ) {
                if ( ! is_array( $user ) ) {
                    continue;
                }

                if ( $user['session_id'] !== $item['session_id'] ) {
                    continue;
                }

                unset( $user['session_id'] );
                array_push( $users, $user );
            }

            $item['users'] = $users;

            return $item;

        }, $session_data );


        return $this->response( true, $session_data );
    }

    /**
     * Add Terms
     * 
     * @param $request
     * @return array Response
     */
    public function add_terms( $request ) {
        $args = $request->get_params();

        $default = [];

        $default['session_id'] = '';
        $default['term_id']    = '';

        $args = Helper\merge_params( $default, $args );

        if ( empty( $args['session_id'] ) ) {
            $message = __( 'The session ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['term_id'] ) ) {
            $message = __( 'The term ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $terms = Helper\convert_string_to_int_array( $args['term_id'] );

        if ( empty( $terms ) ) {
            $message = __( 'The term ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $data = [];

        $data['failed']  = [];
        $data['success'] = [];

        foreach( $terms as $term_id ) {

            $status = Session_Term_Relationship_Model::create_item([ 
                'session_id' => $args['session_id'],
                'term_id'    => $term_id,
            ]);

            if ( is_wp_error( $status ) ) {
                $data['failed'][ $term_id ] = $status;
                continue;
            }

            $data['success'][ $term_id ] = $status;

        }
        
        $success = ( count( $data['success'] ) === count( $terms ) ) ? true : false;

        return $this->response( $success, $data );
    }

    /**
     * Remove Terms
     * 
     * @param $request
     * @return array Response
     */
    public function remove_terms( $request ) {
        $args = $request->get_params();

        $default = [];

        $default['session_id'] = '';
        $default['term_id']    = '';

        $args = Helper\merge_params( $default, $args );

        if ( empty( $args['session_id'] ) ) {
            $message = __( 'The session ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['term_id'] ) ) {
            $message = __( 'The term ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $terms = Helper\convert_string_to_int_array( $args['term_id'] );

        if ( empty( $terms ) ) {
            $message = __( 'The term ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $data = [];

        $data['failed']  = [];
        $data['success'] = [];

        foreach( $terms as $term_id ) {

            $status = Session_Term_Relationship_Model::delete_item_where([ 
                'session_id'       => $args['session_id'],
                'term_taxonomy_id' => $term_id,
            ]);

            if ( is_wp_error( $status ) ) {
                $data['failed'][ $term_id ] = $status;
                continue;
            }

            $data['success'][ $term_id ] = $status;

        }
        
        $success = ( count( $data['success'] ) === count( $terms ) ) ? true : false;

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

}
