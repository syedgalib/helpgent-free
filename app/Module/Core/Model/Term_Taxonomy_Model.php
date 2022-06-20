<?php

namespace WPWaxCustomerSupportApp\Module\Core\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Root\Helper;

class Term_Taxonomy_Model extends DB_Model {

    /**
     * Table Name
     * 
     * @var string
     */
    public static $table = 'term_taxonomy';

    /**
     * Get Items
     * 
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [], $only_first_item = false ) {
        global $wpdb;

		$table = self::get_table_name( self::$table );

        $default = [];

        $default['limit'] = 20;
        $default['page']  = 1;

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		$where = ' WHERE 1=1';

        // Construct where clause
        if ( ! empty( $args['where'] ) && is_array( $args[ 'where' ] ) ) {
            
            foreach ( $args['where'] as $key => $value ) {
                $where .= " AND {$key}='{$value}'";
            }

        }

		$select = "SELECT * FROM $table";

		$query = $select . $where . " LIMIT $limit OFFSET $offset";

        $results = $wpdb->get_results( $query, ARRAY_A );

        if ( ! empty( $results ) && $only_first_item ) {
            return $results[0];
        }

		return $results;

    }

    /**
     * Get Item
     * 
     * @param int $term_taxonomy_id
     * @return array|WP_Error
     */
    public static function get_item( $term_taxonomy_id ) {
        global $wpdb;

        if ( empty( $term_taxonomy_id ) ) {
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table = self::get_table_name( self::$table );

		$query = $wpdb->prepare( "SELECT * FROM $table WHERE term_taxonomy_id = %d", array( $term_taxonomy_id ) );

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

        $default['term_id']  = 0;
        $default['taxonomy'] = '';
        $default['parent']   = 0;

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

        if ( empty( $args['term_id'] ) ) {
            $message = __( 'The term ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['taxonomy'] ) ) {
            $message = __( 'The taxonomy is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $args   = Helper\merge_params( $default, $args );
		$result = $wpdb->insert( $table, $args );

        if ( empty( $result ) ) {
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

        $table = self::get_table_name( self::$table );
        $where = [];

        if ( isset( $args['where'] ) && is_array( $args['where'] ) ) {
            $where = $args['where'];
        } else if ( isset( $args['term_taxonomy_id'] ) && is_numeric( $args['term_taxonomy_id'] ) ) {
            $where = [ 'term_taxonomy_id' => $args['term_taxonomy_id'] ];
        }

        if ( empty( $where ) ) {
            $message = __( 'The resource identifier is missing.', 'wpwax-customer-support-app' );
            $log     = [ 'error_key' => 'resource_identifier_is_missing' ];

            return new WP_Error( 403, $message, $log );
        }

        $default = [];

        $default['parent'] = 0;

        $args = Helper\filter_params( $default, $args );

        $old_data = self::get_items( [ 'where' => $where ], true );

        if ( empty( $old_data ) ) {
            $message = __( 'The resource not found.', 'wpwax-customer-support-app' );
            $log     = [ 'error_key' => 'resource_not_found' ];

            return new WP_Error( 403, $message, $log );
        }

        if ( Helper\list_has_same_data( $old_data, $args ) ) {
            return self::get_item( $old_data['term_taxonomy_id'] );
        }

        $result = $wpdb->update( $table, $args, $where );

        if ( ! $result ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            $log     = [ 'error_key' => 'update_failed' ];

            return new WP_Error( 403, $message, $log );
        }

        return self::get_item( $old_data['term_taxonomy_id'] );
    }

    /**
     * Delete Item
     * 
     * @param int $term_taxonomy_id
     * @return bool
     */
    public static function delete_item( $term_taxonomy_id ) {

        if ( empty( $term_taxonomy_id ) ) {
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $where = ['term_taxonomy_id' => $term_taxonomy_id ];

        return self::delete_item_where( $where );
    }

    /**
     * Delete Item Where
     * 
     * @param array $where
     * @return bool
     */
    public static function delete_item_where( $where = [] ) {
        global $wpdb;

		$table  = self::get_table_name( self::$table );
		$status = $wpdb->delete( $table, $where );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return ( ! empty( $status ) ) ? true : false;
    }

}

