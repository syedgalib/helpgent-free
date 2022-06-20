<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Model;

use WPWaxCustomerSupportApp\Model\DB_Model;
use \WP_Error;

class Message_Term_Relationship_Model extends DB_Model {

    /**
     * Table Name
     * 
     * @var string
     */
    public static $table = 'message_term_relationships';

    /**
     * Get Items
     * 
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [] ) {
        global $wpdb;

		$relationship_table = self::get_table_name( self::$table );
		$term_table         = self::get_table_name( Term_Model::$table );
		$taxonomy_table     = self::get_table_name( Term_Taxonomy_Model::$table );

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

        $query = "SELECT {$relationship_table}.*, {$taxonomy_table}.*,  {$term_table}.*
        FROM {$relationship_table}
        INNER JOIN {$taxonomy_table} ON {$relationship_table}.term_taxonomy_id = {$taxonomy_table}.term_taxonomy_id
        INNER JOIN {$term_table} ON {$taxonomy_table}.term_id = {$term_table}.term_id
        LIMIT $limit OFFSET $offset
        ";

        // $select = "SELECT {$relationship_table}.*, {$taxonomy_table}.*
        // FROM ( 
        //     ({$relationship_table} INNER JOIN {$taxonomy_table} ON {$relationship_table}.term_taxonomy_id = {$taxonomy_table}.term_taxonomy_id)
        //     -- INNER JOIN {$term_table} ON {$taxonomy_table}.term_id = {$term_table}.term_id
        // )
        // ";

        // $as = "SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
        // FROM (
        //     (Orders INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
        //     INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID
        // );";

		// $select = "SELECT * FROM $relationship_table";

		// $query = $select . $where . $order . " LIMIT $limit OFFSET $offset";

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

        return Term_Model::get_item( $id );
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

        $default['object_id']        = 0;
        $default['term_taxonomy_id'] = 0;

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

        $term = Term_Model::get_item( $args['term_taxonomy_id'] );

        if ( is_wp_error( $term ) ) {
            return $term;
        }

        if ( empty( $args['object_id'] ) ) {
            $message = __( 'Object ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['term_taxonomy_id'] ) ) {
            $message = __( 'Term taxonomy id is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }
        
		$result = $wpdb->insert( $table, $args );

        if ( ! $result ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $args['term_taxonomy_id'] );
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

}

