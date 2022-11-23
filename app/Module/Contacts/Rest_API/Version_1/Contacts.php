<?php

namespace HelpGent\Module\Contacts\Rest_API\Version_1;

use WP_Error;
use HelpGent\Base\Helper;
use HelpGent\Module\Contacts\Model\Contacts_Model;

class Contacts extends Rest_Base
{

    /**
     * Rest Base
     *
     * @var string
     */
    public $rest_base = 'contacts';

    public function register_routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base,
            [
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get_items'],
                    'permission_callback' => [$this, 'check_auth_permission'],
                    'args'                => [
                        'timezone'    => [
                            'default'           => '',
                            'sanitize_callback' => [ $this, 'sanitize_timezone_string' ],
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
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->rest_base . '/(?P<email>.+)',
            [
                'args' => [
                    'email' => [
                        'type' => 'string',
                    ],
                ],
                [
                    'methods'             => \WP_REST_Server::READABLE,
                    'callback'            => [$this, 'get_item'],
                    'permission_callback' => [$this, 'check_auth_permission'],
                    'args'                => [
                        'timezone' => [
                            'default'           => '',
                            'sanitize_callback' => [ $this, 'sanitize_timezone_string' ],
                        ],
                    ],
                ],
            ]
        );
    }

    /**
     * @param $value
     */
    public function validate_order($value)
    {
        return in_array($value, ['latest', 'oldest']);
    }

    /**
     * @param $request
     * @return mixed
     */
    public function get_items( $request )  {
        $args = $request->get_params();

        $where = [];

        $where['id']        = null;
        $where['email']     = null;
        $where['name']      = null;
        $where['is_client'] = null;
        $where['phone']     = null;

        $where = Helper\merge_params($where, $args);

        $default = [];

        $default['limit']    = 20;
        $default['page']     = 1;
        $default['order_by'] = null;

        $args = Helper\merge_params( $default, $args );

        $args['where'] = $where;

        // Filter By Name
        if ( ! empty( $args['where']['name'] ) ) {
            $args['where']['name'] = [
                'key'     => 'name',
                'compare' => 'LIKE',
                'value'   => $args['where']['name'],
            ];
        }

		$user_meta_query  = [];
		$guest_meta_query = [];

        // Meta | Is Client
        if ( isset( $args['where']['is_client'] ) ) {
			$is_client = Helper\is_truthy( $args['where']['is_client'] ) ? '1' : '0';

            $user_meta_query[] = [
                'key'     => HELPGENT_USER_META_IS_CLIENT,
                'compare' => '=',
                'value'   => $is_client,
            ];

			if ( '0' === $is_client ) {
				$guest_meta_query[] = [
					'key'     => 'is_client',
					'compare' => '=',
					'value'   => 0,
				];
			}

			unset( $args['where']['is_client'] );
        }

        // Meta | Phone
        if ( ! empty( $args['where']['phone'] ) ) {
            $user_meta_query[] = [
                'key'     => HELPGENT_USER_META_PHONE,
                'compare' => '=',
                'value'   => $args['where']['phone'],
            ];

            $guest_meta_query[] = [
                'key'     => 'phone',
                'compare' => '=',
                'value'   => $args['where']['phone'],
            ];

			unset( $args['where']['phone'] );
        }

		if ( ! empty( $user_meta_query ) ) {
			$args['where']['user_meta_query'] = $user_meta_query;
		}

		if ( ! empty( $guest_meta_query ) ) {
			$args['where']['guest_meta_query'] = $guest_meta_query;
		}

		// Filter Client Contacts
		if ( ! Helper\is_current_user_admin() ) {
			return $this->response( true, [] );
		}

        $data    = Contacts_Model::get_items( $args );
        $results = $data['results'];


        if ( empty( $results ) ) {
            return $this->response( true, [] );
        }

        // Prepare items for response
        foreach ( $results as $key => $value ) {
            $item = $this->prepare_contact_item_for_response( $value, $args );

            if ( empty( $item ) ) {
				unset( $results[ $key ] );
                continue;
            }

            $results[ $key ] = $item;
        }

		$results = array_values( $results );

		$headers = [
            'X-WP-Total'      => $data['found_items'],
            'X-WP-TotalPages' => $data['total_pages'],
        ];

        return $this->response( true, $results, '', $headers );
    }

    /**
     * Get Item
     *
     * @param object $request
     * @return array|WP_Error Response
     */
    public function get_item( $request ) {
        $args  = $request->get_params();
        $email = ( ! empty( $args['email'] ) ) ? $args['email'] : '';
        $item  = Contacts_Model::get_item( $email );

		if ( is_wp_error(  $item) ) {
			return $item;
		}

        return $this->response( true, $item );
    }

    /**
     * Prepare contact item for response
     *
     * @param array $item WordPress representation of the item.
     *
     * @return WP_REST_Response|null Response object on success, or null object on failure.
     */
    public function prepare_contact_item_for_response( $item ) {
		return Helper\get_user_data_by( 'email', $item['email'] );
    }
}
