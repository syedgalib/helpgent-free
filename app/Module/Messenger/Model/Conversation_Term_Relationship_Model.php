<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Model;

use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Module\Core\Model\Term_Model;
use WPWaxCustomerSupportApp\Module\Core\Model\Term_Taxonomy_Model;
use \WP_Error;

class Conversation_Term_Relationship_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'conversation_term_relationships';

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

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		$where = ' WHERE 1=1';

        // Construct where clause
		$table_field_map = [
			'conversation_id'  => $relationship_table,
			'term_taxonomy_id' => $relationship_table,
			'order'            => $relationship_table,
			'term_id'          => $term_table,
			'taxonomy'         => $term_table,
			'parent'           => $term_table,
			'name'             => $term_table,
			'term_key'         => $term_table,
		];

		$where_args = ! empty( $args['where'] ) ? $args['where'] : [];
		$where = self::prepare_where_query_v2( $where_args, $table_field_map );

        $select = "SELECT {$relationship_table}.*, {$taxonomy_table}.*,  {$term_table}.*
        FROM {$relationship_table}
        INNER JOIN {$taxonomy_table} ON {$relationship_table}.term_taxonomy_id = {$taxonomy_table}.term_taxonomy_id
        INNER JOIN {$term_table} ON {$taxonomy_table}.term_id = {$term_table}.term_id
        ";

		$query = $select . $where . " LIMIT $limit OFFSET $offset";

		return $wpdb->get_results( $query, ARRAY_A );
    }

    /**
     * Get Item
     *
     * @param int $id
     * @return array|WP_Error
     */
    public static function get_item( $conversation_id ) {

        if ( empty( $conversation_id ) ) {
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$items = self::get_items( [ 'where' => [ 'conversation_id' => $conversation_id ] ] );

		if ( empty( $items ) ) {
			return [];
		}

        return $items[0];
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

        if ( empty( $args['conversation_id'] ) ) {
            $message = __( 'The conversation ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['term_taxonomy_id'] ) ) {
            $message = __( 'The term taxonomy ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$conversation = Conversation_Model::get_item( $args['conversation_id'] );

		if ( is_wp_error( $conversation ) ) {
			$message = __( 'The conversation does not exist.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

        $default = [];

        $default['conversation_id']  = 0;
        $default['term_taxonomy_id'] = 0;
        $default['order']            = 0;

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;
        $term = Term_Taxonomy_Model::get_item( $args['term_taxonomy_id'] );

        if ( is_wp_error( $term ) ) {
            return $term;
        }

        $args['term_taxonomy_id'] = $term['term_taxonomy_id'];

		$result = $wpdb->insert( $table, $args );

        if ( ! $result ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $args['conversation_id'] );
    }

    /**
     * Update Item
     *
     * @param array $args
     * @return array|WP_Error
     */
    public static function update_item( $args = [] ) {
        global $wpdb;

        if ( empty( $args['conversation_id'] ) ) {
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $conversation_id = $args['conversation_id'];

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $conversation_id );

        if ( empty( $old_data ) ) {
            $message = __( 'The resource not found.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $args = ( is_array( $args ) ) ? array_merge( $old_data, $args ) : $old_data;

        $where = [ 'conversation_id' => $conversation_id ];

        $result = $wpdb->update( $table, $args, $where, null, '%d' );

        if ( ! $result ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $conversation_id );
    }

    /**
     * Delete Item
     *
     * @param int $id
     * @return bool
     */
    public static function delete_item( $conversation_id ) {
        global $wpdb;

        if ( empty( $conversation_id ) ) {
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table = self::get_table_name( self::$table );
		$where = [ 'conversation_id' => $conversation_id ];

		$status = $wpdb->delete( $table, $where, '%d' );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return ( ! empty( $status ) ) ? true : false;
    }

    /**
     * Delete Item
     *
     * @param array $args
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

