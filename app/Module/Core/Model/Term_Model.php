<?php

namespace WPWaxCustomerSupportApp\Module\Core\Model;

use \WP_Error;
use \WP_REST_Request;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Root\Helper;

class Term_Model extends DB_Model {

    /**
     * Table Name
     * 
     * @var string
     */
    public static $table = 'terms';

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

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		$where = ' WHERE 1=1';

		$select = "SELECT * FROM $table";

		$query = $select . $where . " LIMIT $limit OFFSET $offset";

		return $wpdb->get_results( $query, ARRAY_A );

    }

    /**
     * Get Item
     * 
     * @param array $args
     * @return array|WP_Error
     */
    public static function get_item( $term_id ) {
        global $wpdb;

        if ( empty( $term_id ) ) {
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table = self::get_table_name( self::$table );

		$query = $wpdb->prepare( "SELECT * FROM $table WHERE term_id = %d", array( $term_id ) );

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

        if ( ! isset( $args['term_id'] ) ) {
            unset( $args['term_id'] );
        }

        if ( empty( $args['name'] ) ) {
            $message = __( 'The term name is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['taxonomy'] ) ) {
            $message = __( 'The taxonomy is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $term_exists = self::term_exists( $args['name'], $args['taxonomy'] );

        if ( $term_exists ) {
            $message = __( 'The term already exists.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $default_term_args = [];
        $default_term_args['name'] = '';

        $term_args = Helper\merge_params( $default_term_args, $args );

        $term_args['term_key'] = Helper\generate_slug( $term_args['name'] );

		$create_terms = $wpdb->insert( $table, $term_args );

        if ( empty( $create_terms ) ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $args['term_id'] = $wpdb->insert_id;
        $term_taxonomy = Term_Taxonomy_Model::create_item( $args );

        if ( is_wp_error( $term_taxonomy ) ) {

            // Delete The Term
            self::delete_item( $args['term_id'] );

            return $term_taxonomy;

        }

        $term = self::get_item( $args['term_id'] );

        if ( is_wp_error( $term ) ) {

            // Delete The Term
            self::delete_item( $args['term_id'] );

            // Delete The Term Taxonomy
            Term_Taxonomy_Model::delete_item( $term_taxonomy['term_taxonomy_id'] );

            return $term;
        }

        $data = array_merge( $term, $term_taxonomy );

        return $data;
    }

    /**
     * Update Item
     * 
     * @param WP_REST_Request $request
     * @return array|WP_Error
     */
    public static function update_item( $args = [] ) {
        global $wpdb;

        if ( empty( $args['term_id'] ) ) {
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $id = $args['term_id'];

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $id );

        if ( empty( $old_data ) ) {
            $message = __( 'The resource not found.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $args  = ( is_array( $args ) ) ? array_merge( $old_data, $args ) : $old_data;
        $where = [ 'term_id' => $id ];

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
		$where = [ 'term_id' => $id ];

		$status = $wpdb->delete( $table, $where, '%d' );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return ( ! empty( $status ) ) ? true : false;
    }

    /**
     * Term Exists
     * 
     * @param string $term_name
     * @param string $taxonomy
     * 
     * @return bool
     */
    public static function term_exists( $term_name, $taxonomy ) {
        global $wpdb;

        $term_table          = self::get_table_name( self::$table );
        $term_taxonomy_table = self::get_table_name( 'term_taxonomy' );

        $term_key = Helper\generate_slug( $term_name );

        $sql = "SELECT {$term_table}.term_key, {$term_taxonomy_table}.taxonomy
        FROM {$term_table}
        INNER JOIN {$term_taxonomy_table}
        ON {$term_table}.term_id = {$term_taxonomy_table}.term_id
        WHERE {$term_table}.term_key = '{$term_key}' AND {$term_taxonomy_table}.taxonomy = '{$taxonomy}'
        ";

        $query   = $wpdb->prepare( $sql );
        $results = $wpdb->get_results( $query, ARRAY_A );

        return ! empty( $results ) ? true : false;
    }

}

