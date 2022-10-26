<?php

namespace WPWaxCustomerSupportApp\Module\Core\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;

use function WPWaxCustomerSupportApp\Base\Helper\filter_params;

class Guest_User_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'guest_users';

	/**
     * Table Relation Column
     *
     * @var string
     */
    public static $table_relation_column = 'user_id';

	/**
     * Meta Table Name
     *
     * @var string
     */
    public static $meta_table = 'guest_user_meta';


	/**
     * Get Items
     *
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [] ) {
        global $wpdb;

		$table           = self::get_table_name( self::$table );
		$meta_table      = self::get_table_name( self::$meta_table );
		$relation_column = self::$table_relation_column;

        $default = [];

        $default['limit'] = 20;
        $default['page']  = 1;

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		$table_field_map  = [];
		$tax_query_count  = 0;
		$meta_query_count = 0;

		$where_args = ( ! empty( $args['where'] ) ) ? $args['where'] : [];
		$where      = self::prepare_where_query_v2( $where_args, $table_field_map, $tax_query_count, $meta_query_count );

		$select = "SELECT user.* FROM $table as user";
		$join   = '';

		// Join Meta Table
		if ( ! empty( $meta_query_count )  ) {
			for ( $i = 0; $i < $meta_query_count; $i++ ) {
				$join .= " LEFT JOIN $meta_table as meta_$i ON user.id = meta_$i.$relation_column";
			}
		}

		$query = $select . $join . $where . " LIMIT $limit OFFSET $offset";

		file_put_contents( WPWAX_CUSTOMER_SUPPORT_APP_BASE . '__log/guest-query.sql', $query );

		return $wpdb->get_results( $query, ARRAY_A );

    }

    /**
     * Get Item
     *
     * @param int $id
     * @return array|WP_Error
     */
    public static function get_item( $id ) {
        global $wpdb;

        if ( empty( $id ) ) {
            $message = __( 'The user ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table = self::get_table_name( self::$table );

		$query = $wpdb->prepare( "SELECT * FROM $table WHERE id = %d", array( $id ) );

		$result = $wpdb->get_row( $query, ARRAY_A );

        if ( empty( $result ) ) {
            $message = __( 'Could not find the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		return $result;
    }

    /**
     * Create Item
     *
     * @param array $args
     * @return array|WP_Error
     */
    public static function create_item( $args = [] ) {
        global $wpdb;

        $table = self::get_table_name( self::$table );

        $default = [
			'email'      => '',
			'name'       => '',
			'created_at' => current_time( 'mysql', true ),
		];

        $args = filter_params( $default, $args );

		if ( empty( $args['name'] ) ) {
			$message = __( 'Name is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		if ( empty( $args['email'] ) ) {
			$message = __( 'Email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		if ( ! is_email( $args['email'] ) ) {
			$message = __( 'A valid email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		$result = $wpdb->insert( $table, $args );

        if ( ! $result ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $wpdb->insert_id );
    }

    /**
     * Update Item
     *
     * @param array $args
     * @return array|WP_Error
     */
    public static function update_item( $args = [] ) {
        global $wpdb;

        if ( empty( $args['id'] ) ) {
            $message = __( 'User ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $id = $args['id'];

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $id );

        if ( is_wp_error( $old_data ) ) {
            $message = __( 'The resource not found.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $args = ( is_array( $args ) ) ? array_merge( $old_data, $args ) : $old_data;

        $where = [ 'id' => $id ];

        $result = $wpdb->update( $table, $args, $where, null, '%d' );

        if ( false === $result ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $id );
    }

    /**
     * Delete Item
     *
     * @param int $id
     * @return bool
     */
    public static function delete_item( $id ) {
        global $wpdb;

        if ( empty( $id ) ) {
            $message = __( 'User ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table = self::get_table_name( self::$table );
		$where = ['id' => $id ];

		$status = $wpdb->delete( $table, $where, '%s' );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return ( ! empty( $status ) ) ? true : false;
    }

	/**
	 * Check if user exists
	 *
	 * @param string $email
	 * @return bool|WP_Error
	 */
	public static function user_exists( $email ) {

		if ( ! is_email( $email ) ) {
			$message = __( 'A valid email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		$user = self::get_items([
			'where' => [
				'email' => $email,
			]
		]);

		if ( empty( $user ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Get Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 * @param mixed $default
	 *
	 * @return mixed Value
	 */
	public static function get_meta( $object_id, $meta_key = '', $default = '' ) {

		return parent::_get_meta( $object_id, $meta_key, $default, self::$meta_table, self::$table_relation_column );

	}

	/**
	 * Update Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 * @param mixed $value
	 *
	 * @return mixed Value
	 */
	public static function update_meta( $object_id, $meta_key = '', $value = '' ) {

		return parent::_update_meta( $object_id, $meta_key, $value, self::$meta_table, self::$table_relation_column );

	}

	/**
	 * Delete Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 *
	 * @return bool Status
	 */
	public static function delete_meta( $object_id, $meta_key = '' ) {

		return parent::_delete_meta( $object_id, $meta_key, self::$meta_table, self::$table_relation_column );

	}

	/**
	 * Check if meta key exists
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 *
	 * @return mixed Status
	 */
	public static function meta_key_exists( $object_id, $meta_key = '' ) {

		return parent::_meta_key_exists( $object_id, $meta_key, self::$meta_table, self::$table_relation_column );

	}

}

