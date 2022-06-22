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
                        'order_by'       => [
                            'default'           => 'latest',
                            'validate_callback' => [ $this, 'validate_order' ],
                        ],
                    ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<id>[\w]+)',
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
     * Validate Message Type
     * 
     * @param $value
     */
    public function validate_message_type( $value ) {
        return in_array( $value, [ 'text', 'video', 'audio' ] );
    }

    /**
     * Validate Order
     * 
     * @param $value
     */
    public function validate_order( $value ) {
        return in_array( $value, [ 'latest', 'oldest', 'read', 'unread' ] );
    }

    /**
     * Get Items
     * 
     * @param $request
     * @return mixed
     */
    public function get_items( $request ) {

        // Get session data
        $args = $request->get_params();

        $default = [];

        $default['order_by'] = 'latest';

        $args = array_merge( $default, $args );

        $args['group_by'] = 'session_id';
        $args['fields']   = [ 'GROUP_CONCAT(user_id) as users', 'session_id' ];

        $session_data = Message_Model::get_items( $args );

        if ( empty( $session_data ) ) {
            return $this->response( true, [] );
        }

        // Add user data to session data
        $session_data = array_map( function( $item ) {

            $users = [];
            $users_ids = Helper\convert_string_to_int_array( $item['users'] );
            $users_ids = array_unique( $users_ids );

            foreach( $users_ids as $user_id ) {
                $user = get_user_by( 'id', $user_id );

                if ( empty( $user ) ) {
                    continue;
                }

                $avater = get_user_meta( $user->ID, '_wpwax_vm_avater', true );

                $user_info = [];

                $user_info['id']     = $user->ID;
                $user_info['name']   = $user->display_name;
                $user_info['avater'] = $avater;

                array_push( $users, $user_info );
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
     * Delete Item
     * 
     * @param $request
     * @return mixed
     */
    public function delete_item( $request ) {
        $args = $request->get_params();

        $where = [ 'session_id' => $args['id'] ];

        $operation = Message_Model::delete_item_where( $where );
        $success   = $operation ? true : false;

        if ( $success ) {
            Session_Term_Relationship_Model::delete_item_where( $where );
        }

        return $this->response( $success );
    }

}
