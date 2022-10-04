<?php

namespace WPWaxCustomerSupportApp\Model;

use \WP_Error;

abstract class DB_Model implements DB_Model_Interface {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = '';

    /**
     * Get Items
     *
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [] ) {
        global $wpdb;

		$table = self::get_table_name( self::$table );

        $default = [];

        $default['limit'] = 20;
        $default['page']  = 1;
        $default['order'] = 'latest';

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		if ( $args['order'] == 'oldest' ) {
			$order = ' ORDER BY created_on ASC';
		} else {
			$order = ' ORDER BY updated_on DESC';
		}

		$where = ' WHERE 1=1';

		$select = "SELECT * FROM $table";

		$query = $select . $where . $order . " LIMIT $limit OFFSET $offset";

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
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
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

        $default = [];

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

        $time = current_time( 'mysql', true );

        $args['created_on'] = $time;
        $args['updated_on'] = $time;

        if ( ! isset( $args['id'] ) ) {
            unset( $args['id'] );
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
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $id = $args['id'];

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $id );

        if ( empty( $old_data ) ) {
            $message = __( 'The resource not found.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $args = ( is_array( $args ) ) ? array_merge( $old_data, $args ) : $old_data;

        $time = current_time( 'mysql', true );
        $args['updated_on'] = $time;

        $where = ['id' => $id ];

        $result = $wpdb->update( $table, $args, $where, null, '%d' );

        if ( ! $result ) {
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
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table = self::get_table_name( self::$table );
		$where = ['id' => $id ];

		$status = $wpdb->delete( $table, $where, '%d' );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return ( ! empty( $status ) ) ? true : false;
    }

    /**
     * Get Table Name
     *
     * @return String Table Name
     */
    public static function get_table_name( $table = '', $sub_prefix = WPWAX_CUSTOMER_SUPPORT_APP_DB_TABLE_PREFIX . '_' ) {
        global $wpdb;

        return $wpdb->prefix . $sub_prefix . $table;
    }


	/**
	 * Prepare Where Query
	 *
	 * @param array $where_args
	 * @param string $table_name
	 * @param array $table_prefix_fields
	 * @param array $supported_conditions
	 *
	 * @return string Where Query
	 */
	public static function prepare_where_query( $where_args = [], $table_name = '', $table_prefix_fields = [], $supported_conditions = [ 'AND', 'OR' ] ) {
		$where = ' WHERE 1=1';

		foreach ( $where_args as $key => $value ) {

			$where_table_name = ( ! empty( $table_name ) && ! in_array( $key, $table_prefix_fields ) ) ? "{$table_name}." : '';

			// ---> C1
			if ( ! is_array( $value ) ) {
				$where .= " AND {$where_table_name}{$key}='{$value}'";
				continue;
			}

			// ---> C2
			if ( ! empty( $value['condition'] ) && ! empty( $value['rules'] ) ) {

				$_where     = '';
				$_condition = ( ! empty( $value['condition'] ) && in_array( $value['condition'], $supported_conditions ) ) ? $value['condition'] : 'AND';

				foreach ( $value['rules'] as $index => $rule ) {
					$_key       = $where_table_name . $rule['field'];
					$_compare   = $rule['compare'];
					$_value     = $rule['value'];

					if ( $index === 0 ) {
						$_where .= " {$_key} {$_compare} {$_value}";
					} else {
						$_where .= " {$_condition} {$_key} {$_compare} {$_value}";
					}
				}

				$_where = trim( $_where );
				$where .= " AND ( $_where )";

				continue;
			}

			// ---> C3
			$_key     = $where_table_name . $value['field'];
			$_compare = $value['compare'];
			$_value   = $value['value'];

			$where .= " AND {$_key} {$_compare} {$_value}";
		}

		return $where;
	}

}