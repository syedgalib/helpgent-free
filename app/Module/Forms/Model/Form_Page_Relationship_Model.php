<?php

namespace WPWaxCustomerSupportApp\Module\Forms\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Base\Helper;

class Form_Page_Relationship_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'form_page_relationships';

    /**
     * Get Items
     *
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [], $debug = false ) {
        global $wpdb;

		$table = self::get_table_name( self::$table );

        $default = [];

        $default['limit']  = 20;
        $default['page']   = 1;
        $default['fields'] = '*';

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		$where = ' WHERE 1=1';

        // Construct where clause
        if ( ! empty( $args['where'] ) && is_array( $args[ 'where' ] ) ) {

            foreach ( $args['where'] as $key => $value ) {

                if ( is_array( $value ) ) {

                    $_key     = $value['field'];
                    $_compare = $value['compare'];
                    $_value   = $value['value'];

                    $where .= " AND {$_key} {$_compare} {$_value}";

                    continue;
                }

                $where .= " AND {$key}='{$value}'";
            }

        }

        $fields = ( ! empty( $args['fields'] ) && is_array( $args['fields'] ) ) ? implode( ', ', $args['fields'] ) : '';
        $fields = trim( $fields, ', ' );
        $fields = ( empty( $fields ) ) ? '*' : $fields;

		$select = "SELECT $fields FROM $table";
		$query  = $select . $where . " LIMIT $limit OFFSET $offset";

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
            return false;
        }

		$table = self::get_table_name( self::$table );

		$query = $wpdb->prepare( "SELECT * FROM $table WHERE form_id = %d", array( $id ) );

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
     * @return int|WP_Error
     */
    public static function create_item( $args = [] ) {
        global $wpdb;

		$table = self::get_table_name( self::$table );

        $default = [];

        $default['form_id'] = 0;
        $default['page_id'] = 0;

        $args = Helper\merge_params( $default, $args );
		$result = $wpdb->insert( $table, $args );

        if ( empty( $result ) ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		return self::get_item( $args['form_id'] );
    }

    /**
     * Update Item
     *
     * @param array $args
     * @return array|WP_Error
     */
    public static function update_item( $args = [] ) {
        global $wpdb;

        if ( empty( $args['form_id'] ) ) {
            $message = __( 'Form ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $args['form_id'] );

        if ( empty( $old_data ) ) {
            $message = __( 'Could not find the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $args = Helper\filter_params( $old_data, $args );

        if ( Helper\list_has_same_data( $old_data, $args ) ) {
            return self::get_item( $args['form_id'] );
        }

        $where = ['form_id' => $args['form_id'] ];
		$result = $wpdb->update( $table, $args, $where );

        if ( empty( $result ) ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $args['id'] );
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
		$where = ['form_id' => $id ];

		$status = $wpdb->delete( $table, $where, '%d' );

        return ( ! empty( $status ) ) ? true : false;
    }

    /**
     * Delete Item Where
     *
     * @param array $args
     * @return bool
     */
    public static function delete_item_where( $where = [] ) {
        global $wpdb;

		$table = self::get_table_name( self::$table );
		$status = $wpdb->delete( $table, $where );

        return ( ! empty( $status ) ) ? true : false;
    }
}

