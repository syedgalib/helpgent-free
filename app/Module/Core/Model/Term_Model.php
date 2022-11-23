<?php

namespace HelpGent\Module\Core\Model;

use \WP_Error;
use HelpGent\Model\DB_Model;
use HelpGent\Base\Helper;

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

		$term_table          = self::get_table_name( self::$table );
		$term_taxonomy_table = self::get_table_name( Term_Taxonomy_Model::$table );

        $default = [];

        $default['limit'] = 20;
        $default['page']  = 1;

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		$pagination = ( $limit < 0 ) ? '' : " LIMIT ${limit} OFFSET ${offset}";

		$where_args = ( ! empty( $args['where'] ) ) ? $args['where'] : [];

		$table_field_map = [
			'term_id'          => $term_table,
			'name'             => $term_table,
			'term_key'         => $term_table,
			'order'            => $term_table,
			'term_taxonomy_id' => $term_taxonomy_table,
			'taxonomy'         => $term_taxonomy_table,
			'parent'           => $term_taxonomy_table,
		];

		$where = self::prepare_where_query_v2( $where_args, $table_field_map );

        $select = "SELECT {$term_table}.*, {$term_taxonomy_table}.*";

		$from = " FROM {$term_table}
        INNER JOIN {$term_taxonomy_table}
        ON {$term_table}.term_id = {$term_taxonomy_table}.term_id";

		$query = $select . $from . $where . $pagination;
		$results = $wpdb->get_results( $query, ARRAY_A );

		$total_query = "SELECT COUNT(*)" . $from . $where;
		$found_items = $wpdb->get_var( $total_query );
		$found_items = ( ! empty( $found_items ) ) ? ( int ) $found_items : 0;

		$total_page = 1;

		if ( ! empty( $pagination ) ) {
			$remainder    = $found_items % $limit;
			$total_page = ( $found_items - $remainder ) / $limit;
			$total_page = ( $remainder > 0 ) ? $total_page + 1 : $total_page;
		}

		$data = [
			'results'     => $results,
			'found_items' => $found_items,
			'total_page'  => $total_page,
		];

		return $data;

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
            $message = __( 'The resource ID is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        $term_table          = self::get_table_name( self::$table );
		$term_taxonomy_table = self::get_table_name( Term_Taxonomy_Model::$table );

        $sql = "SELECT {$term_table}.*, {$term_taxonomy_table}.*
        FROM {$term_table}
        INNER JOIN {$term_taxonomy_table}
        ON {$term_table}.term_id = {$term_taxonomy_table}.term_id
        WHERE {$term_table}.term_id = %d
        ";

        $query  = $wpdb->prepare( $sql, [ $term_id ] );
        $result = $wpdb->get_row( $query, ARRAY_A );

        if ( empty( $result ) ) {
            $message = __( 'Could not find the resource.', 'helpgent' );
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
            $message = __( 'The term name is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['taxonomy'] ) ) {
            $message = __( 'The taxonomy is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        $term_exists = self::term_exists( $args['name'], $args['taxonomy'] );

        if ( $term_exists ) {
            $message = __( 'The resource already exists.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        $default_term_args = [];
        $default_term_args['name'] = '';

        $term_args = Helper\merge_params( $default_term_args, $args );

        $term_args['term_key'] = Helper\generate_slug( $term_args['name'] );

		$create_terms = $wpdb->insert( $table, $term_args );

        if ( empty( $create_terms ) ) {
            $message = __( 'Could not create the resource.', 'helpgent' );
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
     * @param array $args
     * @return array|WP_Error
     */
    public static function update_item( $args = [] ) {
        global $wpdb;

        if ( empty( $args['term_id'] ) ) {
            $message = __( 'The resource ID is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        $id = $args['term_id'];

		$table         = self::get_table_name( self::$table );
		$old_term_data = self::get_item( $id );

        $term_taxonomy_args = [ 'where' => [ 'term_id' => $id ] ];
        $term_taxonomy_data = Term_Taxonomy_Model::get_items( $term_taxonomy_args, true );

        if ( empty( $old_term_data ) ) {
            $message = __( 'The resource not found.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $term_taxonomy_data ) ) {
            $message = __( 'The resource is not valid.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        // Update Terms
        $accepted_terms_args = [];
        $accepted_terms_args['name'] = '';
        $terms_args = Helper\filter_params( $accepted_terms_args, $args );

        $term_is_updatable = ! Helper\list_has_same_data( $old_term_data, $terms_args );

        if ( ! empty( $terms_args ) && $term_is_updatable ) {
            $terms_args = Helper\merge_params( $accepted_terms_args, $args );
            $term_exists = self::term_exists( $terms_args['name'], $term_taxonomy_data['taxonomy'] );

            if ( $term_exists ) {
                $message = __( 'The resource already exists.', 'helpgent' );
                return new WP_Error( 403, $message );
            }

            if ( ! empty( $terms_args['name'] ) ) {
                $terms_args['term_key'] = Helper\generate_slug( $terms_args['name'] );
            }

            $where  = [ 'term_id' => $id ];
            $result = $wpdb->update( $table, $terms_args, $where, null, '%d' );

            if ( empty( $result ) ) {
                $message = __( 'Could not update the resource.', 'helpgent' );
                return new WP_Error( 403, $message );
            }
        }

        // Update Term Taxonomy
        $accepted_term_taxonomy_args = [];
        $accepted_term_taxonomy_args['parent'] = '';

        $updating_term_taxonomy_args = Helper\filter_params( $accepted_term_taxonomy_args, $args );

        if ( ! empty( $updating_term_taxonomy_args ) ) {
            $updating_term_taxonomy_args['where']['term_id'] = $id;
            $term_taxonomy_data = Term_Taxonomy_Model::update_item( $updating_term_taxonomy_args );

            if ( is_wp_error( $term_taxonomy_data ) ) {
                return $term_taxonomy_data;
            }
        }

        $updated_term = self::get_item( $id );
        $data = array_merge( $updated_term, $term_taxonomy_data );

        return $data;
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
            $message = __( 'The resource ID is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        $old_data = self::get_item( $id );

        if ( is_wp_error( $old_data ) ) {
            return $old_data;
        }

		$table = self::get_table_name( self::$table );
        $where = [ 'term_id' => $id ];

        Term_Taxonomy_Model::delete_item_where( $where );

		$status = $wpdb->delete( $table, $where, '%d' );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

		do_action( 'helpgent_after_term_deleted', $old_data );

        return true;
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
        $term_taxonomy_table = self::get_table_name( Term_Taxonomy_Model::$table );

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

