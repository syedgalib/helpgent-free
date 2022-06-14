<?php

namespace WPWaxCustomerSupportApp\Model;

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
     * @return array|null
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
     * @return array|null
     */
    public static function get_item( $id ) {
        global $wpdb;

        if ( empty( $id ) ) {
            return false;
        }

		$table = self::get_table_name( self::$table );

		$query = $wpdb->prepare( "SELECT * FROM $table WHERE id = %d", array( $id ) );

		$result = $wpdb->get_row( $query, ARRAY_A );

		return $result;
    }

    /**
     * Create Item
     * 
     * @param array $args
     * @return int|null
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

		return $result ? $wpdb->insert_id : false;
    }

    /**
     * Update Item
     * 
     * @param array $args
     * @return array|null
     */
    public static function update_item( $args = [] ) {
        global $wpdb;
        
        if ( empty( $args['id'] ) ) {
            return null;
        }

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $args['id'] );

        if ( empty( $old_data ) ) {
            return null;
        }

        $args = ( is_array( $args ) ) ? array_merge( $old_data, $args ) : $old_data;

        $time = current_time( 'mysql', true );
        $args['updated_on'] = $time;

        $where = ['id' => $args['id'] ];

		return $wpdb->update( $table, $args, $where, null, '%d' );
    }

    /**
     * Delete Item
     * 
     * @param array $args
     * @return bool
     */
    public static function delete_item( $id ) {
        global $wpdb;

        if ( empty( $id ) ) {
            return false;
        }

		$table = self::get_table_name( self::$table );
		$where = ['id' => $id ];

		$status = $wpdb->delete( $table, $where, '%d' );

        return ( ! empty( $status ) ) ? true : false;
    }

    /**
     * Get Table Name
     * 
     * @return String Table Name
     */
    public static function get_table_name( $table = '' ) {
        global $wpdb;

        return $wpdb->prefix . WPWAX_CUSTOMER_SUPPORT_APP_DB_TABLE_PREFIX . '_' . $table;
    }

}