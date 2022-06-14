<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Model;

use WPWaxCustomerSupportApp\Model\Base_Model;

class Message_Model extends Base_Model {

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

        $default['user_id']       = 0;
        $default['session_id']    = self::generate_session();
        $default['note']          = '';
        $default['message']       = '';
        $default['attachment_id'] = '';
        $default['message_type']  = '';
        $default['seen_by']       = '';

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

        $time = current_time( 'mysql', true );

        $args['created_on'] = $time;
        $args['updated_on'] = $time;

        if ( ! isset( $args['id'] ) ) {
            unset( $args['id'] );
        }

        if ( ! empty( $args['seen_by'] ) ) {
            $args['seen_by'] = maybe_serialize( $args['seen_by'] );
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

        if ( ! empty( $args['seen_by'] ) ) {
            $args['seen_by'] = maybe_serialize( $args['seen_by'] );
        }

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

