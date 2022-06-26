<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Base\Helper;

class Message_Model extends DB_Model {

    /**
     * Table Name
     * 
     * @var string
     */
    public static $table = 'messages';

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

        $default['limit']    = 20;
        $default['page']     = 1;
        $default['order_by'] = 'latest';
        $default['group_by'] = '';
        $default['fields']   = '*';

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

        // Prepare Order
        switch ( $args['order_by'] ) {
            case 'latest':
                $order = ' ORDER BY updated_on DESC';
                break;

            case 'oldest':
                $order = ' ORDER BY created_on ASC';
                break;

            case 'read':
                $order = " ORDER BY totaL_unread ASC";
                break;

            case 'unread':
                $order = " ORDER BY totaL_unread DESC";
                break;
            
            default:
                $order = ' ORDER BY updated_on DESC';
                break;
        }

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
        
        $group_by = ( ! empty( $args['group_by'] ) ) ? ' GROUP BY ' . $args['group_by'] : '';

        if ( ! empty( $group_by ) ) {
            $count_message = "COUNT( id ) AS total_message";
            $args['fields'][] = $count_message;

            $count_totaL_unread = "COUNT( CASE WHEN seen_by = '' THEN 1 ELSE NULL END ) AS totaL_unread";
            $args['fields'][] = $count_totaL_unread;
        }

        $fields = ( ! empty( $args['fields'] ) && is_array( $args['fields'] ) ) ? implode( ', ', $args['fields'] ) : '';
        $fields = trim( $fields, ', ' );
        $fields = ( empty( $fields ) ) ? '*' : $fields;
        
		$select = "SELECT $fields FROM $table";
		$query  = $select . $where . $group_by . $order . " LIMIT $limit OFFSET $offset";

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
     * @return int|WP_Error
     */
    public static function create_item( $args = [] ) {
        global $wpdb;

		$table = self::get_table_name( self::$table );

        $default = [];

        $default['user_id']       = 0;
        $default['session_id']    = self::generate_session();
        $default['note']          = '';
        $default['message']       = '';
        $default['attachment_id'] = '';
        $default['message_type']  = '';
        $default['seen_by']       = '';

        $args = Helper\merge_params( $default, $args );
        $time = current_time( 'mysql', true );

        $args['created_on'] = $time;
        $args['updated_on'] = $time;

        if ( isset( $args['id'] ) ) {
            unset( $args['id'] );
        }

        if ( ! empty( $args['seen_by'] ) ) {
            $args['seen_by'] = maybe_serialize( $args['seen_by'] );
        }

		$result = $wpdb->insert( $table, $args );

        if ( empty( $result ) ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		return  self::get_item( $wpdb->insert_id );
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
            $message = __( 'Resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $args['id'] );

        if ( empty( $old_data ) ) {
            $message = __( 'Could not find the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }
        
        $args = Helper\filter_params( $old_data, $args );

        $time = current_time( 'mysql', true );
        $args['updated_on'] = $time;

        if ( ! empty( $args['seen_by'] ) ) {
            $args['seen_by'] = maybe_serialize( $args['seen_by'] );
        }

        $where = ['id' => $args['id'] ];

		$result = $wpdb->update( $table, $args, $where, null, '%d' );

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
		$where = ['id' => $id ];

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
		$status = $wpdb->delete( $table, $where, '%d' );

        return ( ! empty( $status ) ) ? true : false;
    }


    /**
     * Generate Session
     * 
     * @return string
     */
    protected static function generate_session() {
		$time   = microtime();
		$time   = str_replace( array( ' ', '.' ), '', $time );
		$chars  = substr( str_shuffle( 'abcdefghijklmnopqrstuvwxyz' ), 1, 10 );
		$random = $chars . $time;
		$random = str_shuffle( $random );

		return $random;
	}

}

