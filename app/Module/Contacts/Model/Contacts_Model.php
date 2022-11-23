<?php

namespace HelpGent\Module\Contacts\Model;

use \WP_Error;
use HelpGent\Model\DB_Model;
use HelpGent\Base\Helper;

class Contacts_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'users';


	/**
     * Get Items
     *
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [] ) {
		global $wpdb;

		$default = [];

        $default['limit'] = 20;
        $default['page']  = 1;
        $default['where'] = null;

		$args = Helper\merge_params( $default, $args );

		$limit      = $args['limit'];
		$offset     = ( $limit * $args['page'] ) - $limit;
		$pagination = " LIMIT $limit OFFSET $offset";

		if ( isset( $args['where']['meta_query'] ) ) {
			unset( $args['where']['meta_query'] );
		}

		// User Query
		$user_args = $args;
		if ( ! empty( $user_args['where']['user_meta_query'] ) ) {
			$user_args['where']['meta_query'] = $user_args['where']['user_meta_query'];

			unset( $user_args['where']['user_meta_query'] );
			unset( $args['where']['user_meta_query'] );
		}

		$user_query = self::prepare_user_select_query( $user_args );

		// Guest User Query
		$guest_user_args = $args;
		if ( ! empty( $guest_user_args['where']['guest_meta_query'] ) ) {
			$guest_user_args['where']['meta_query'] = $guest_user_args['where']['guest_meta_query'];

			unset( $guest_user_args['where']['guest_meta_query'] );
			unset( $args['where']['guest_meta_query'] );
		}

		$guest_user_query = self::prepare_guest_user_select_query( $guest_user_args );

		$union = $user_query . ' UNION ALL ' . $guest_user_query;

		$total_query  = "SELECT COUNT(*) as total FROM( $union ) AS contact";
		$result_query = $union . $pagination;

		$found_items = $wpdb->get_var( $total_query );
		$results     = $wpdb->get_results( $result_query, ARRAY_A );

		$total_pages = 1;

		if ( ! empty( $pagination ) ) {
			$remider     = $found_items % $limit;
			$total_pages = ( $found_items - $remider ) / $limit;
			$total_pages = ( $remider > 0 ) ? $total_pages + 1 : $total_pages;
		}

		return [
			'found_items' => $found_items,
			'results'     => $results,
			'total_pages' => $total_pages,
		];
    }

	/**
	 * Prepare User Select Query
	 *
	 * @param array $args
	 * @return string Query
	 */
	public static function prepare_user_select_query( $args = [] ) {
        $user_table           = self::get_table_name( self::$table, '' );
        $user_meta_table      = self::get_table_name( 'usermeta', '' );
        $user_relation_column = 'user_id';

        $default = [];

        $default['where'] = null;

		$args = Helper\merge_params( $default, $args );

		$user_table_field_map  = [
			'id'           => 'user',
			'email'        => [ 'table' => 'user', 'key' => 'user_email' ],
			'user_email'   => 'user',
			'display_name' => 'user',
			'name'         => [ 'table' => 'user', 'key' => 'display_name' ],
		];

		$user_tax_query_count  = 0;
		$user_meta_query_count = 0;

		$user_where_args = ( ! empty( $args['where'] ) ) ? $args['where'] : [];
		$where_user      = self::prepare_where_query_v2( $user_where_args, $user_table_field_map, $user_tax_query_count, $user_meta_query_count, true );

		$select_user = "SELECT user.ID as id, user.user_email as email, user.display_name as name FROM $user_table as user";

		$join_user   = '';

		// Join Meta Table
		if ( ! empty( $user_meta_query_count )  ) {
			for ( $i = 0; $i < $user_meta_query_count; $i++ ) {
				$join_user .= " LEFT JOIN $user_meta_table as meta_$i ON user.id = meta_$i.$user_relation_column";
			}
		}

		return $select_user . $join_user . $where_user;
	}

	/**
	 * Prepare User Select Query
	 *
	 * @param array $args
	 * @return string Query
	 */
	public static function prepare_guest_user_select_query( $args = [] ) {
        $table           = self::get_table_name( 'guest_users' );
		$meta_table      = self::get_table_name( 'guest_user_meta' );
		$relation_column = 'user_id';

        $default = [];
        $default['where'] = null;

		$args = Helper\merge_params( $default, $args );

		$table_field_map  = [
			'id'    => 'guest_user',
			'email' => 'guest_user',
			'name'  => 'guest_user',
		];

		$tax_query_count  = 0;
		$meta_query_count = 0;

		$where_args = ( ! empty( $args['where'] ) ) ? $args['where'] : [];
		$where      = self::prepare_where_query_v2( $where_args, $table_field_map, $tax_query_count, $meta_query_count, true );

		$select = "SELECT guest_user.id, guest_user.email, guest_user.name FROM $table as guest_user";

		$join   = '';

		// Join Meta Table
		if ( ! empty( $meta_query_count )  ) {
			for ( $i = 0; $i < $meta_query_count; $i++ ) {
				$join .= " LEFT JOIN $meta_table as meta_$i ON guest_user.id = meta_$i.$relation_column";
			}
		}

		return $select . $join . $where;
	}

    /**
     * Get Item
     *
     * @param string $email
     * @return array|WP_Error
     */
    public static function get_item( $email ) {
        if ( empty( $email ) ) {
            $message = __( 'Email is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        if ( ! is_email( $email ) ) {
            $message = __( 'A valid email is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

		return Helper\get_user_data_by( 'email', $email );
    }

}

