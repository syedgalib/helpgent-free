<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Core\Model\Attachment_Model;

class Message_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'messages';

	/**
     * Table Relation Column
     *
     * @var string
     */
    public static $table_relation_column = 'message_id';

	/**
     * Meta Table Name
     *
     * @var string
     */
    public static $meta_table = 'message_meta';

    /**
     * Get Items
     *
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [], $debug = false ) {
        global $wpdb;

		$messages_table = self::get_table_name( self::$table );
		$meta_table     = self::get_table_name( self::$meta_table );

        $default = [];

        $default['limit']    = 20;
        $default['page']     = 1;
        $default['order_by'] = 'latest';
        $default['group_by'] = '';

        $args  = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;
        $limit = $args['limit'];

		if ( $limit < 0 ) {
			$limit = null;
		}

		$offset     = ( ! is_null( $limit ) ) ? ( $limit * $args['page'] ) - $limit : null;
		$pagination = ( ! is_null( $limit ) ) ? " LIMIT $limit OFFSET $offset" : '';

        // Prepare Order
        switch ( $args['order_by'] ) {
            case 'latest':
                $order_by_field = "created_at";
                $order          = " ORDER BY message.$order_by_field DESC";
                break;

            case 'oldest':
                $order_by_field = "created_at";
                $order          = " ORDER BY message.$order_by_field ASC";
                break;

            default:
				$order_by_field = "created_at";
                $order          = " ORDER BY message.$order_by_field DESC";
                break;
        }

		$where = ' WHERE 1=1';

        // Prepare where
		$tax_query_count  = 0;
		$meta_query_count = 0;

		$table_field_map = [
			'conversation_id' => 'message',
			'user_email'      => 'message',
			'created_at'      => 'message',
			'updated_at'      => 'message',
			'message'         => 'message',
			'attachment_id'   => 'message',
			'message_type'    => 'message',
			'parent'          => 'message',
			'parent_type'     => 'message',
		];

        $where = self::prepare_where_query_v2( $args[ 'where' ], $table_field_map, $tax_query_count, $meta_query_count );

		$group_by = ( ! empty( $args['group_by'] ) ) ? ' GROUP BY message.' . $args['group_by'] : '';

		$select = "SELECT message.* FROM $messages_table as message";

		$join = "";

		// Join Meta Table
		if ( ! empty( $meta_query_count )  ) {
			for ( $i = 0; $i < $meta_query_count; $i++ ) {
				$join .= " LEFT JOIN $meta_table as meta_$i ON message.id = meta_$i.message_id";
			}
		}

		$query = $select . $join . $where . $group_by . $order . $pagination;

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
            $message = __( 'Resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$messages_table = self::get_table_name( self::$table );

		$query = $wpdb->prepare( "SELECT * FROM $messages_table WHERE id = %d", array( $id ) );

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

        $default['conversation_id'] = 0;
        $default['user_email']      = '';
        $default['message']         = '';
        $default['attachment_id']   = null;
        $default['message_type']    = 'text';
        $default['parent']          = null;
        $default['parent_type']     = null;

        $args = Helper\merge_params( $default, $args );
        $time = current_time( 'mysql', true );

        $args['created_at'] = $time;
        $args['updated_at'] = $time;

        if ( isset( $args['id'] ) ) {
            unset( $args['id'] );
        }

        if ( empty( $args['conversation_id'] ) ) {
            $message = __( 'Conversation ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( empty( $args['user_email'] ) ) {
            $message = __( 'Author email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		if ( ! is_email( $args['user_email'] ) ) {
            $message = __( 'A valid author email is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$result = $wpdb->insert( $table, $args );

        if ( empty( $result ) ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$message = self::get_item( $wpdb->insert_id );

		return $message;
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
        $args['updated_at'] = $time;

        $where = [ 'id' => $args['id'] ];

		$result = $wpdb->update( $table, $args, $where );

        if ( empty( $result ) ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $args['id'] );
    }

    /**
     * Update Item Where
     *
     * @param array $where
     * @param array $update_fields
	 *
     * @return bool|WP_Error
     */
    public static function update_item_where( $where = [], $update_fields = [] ) {
        global $wpdb;

		if ( empty( $where ) || empty( $update_fields ) ) {
			$message = __( 'Nothing to update.', 'wpwax-customer-support-app' );
			return new WP_Error( 403, $message );
		}

		$table = self::get_table_name( self::$table );
		$where = self::prepare_where_query( $where );

		$fields = '';

		foreach( $update_fields as $field_key => $field_value ) {
			$fields .= "$field_key = '$field_value', ";
		}

		$fields = trim( $fields, ', ' );

		$query  = "UPDATE $table SET $fields $where";
		$result = $wpdb->query( $query );

		if ( false === $result ) {
			$message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
			return new WP_Error( 403, $message );
		}

        return true;
    }

    /**
     * Delete Item
     *
     * @param array $args
     * @return bool|WP_Error
     */
    public static function delete_item( $id ) {
        global $wpdb;

        if ( empty( $id ) ) {
            return false;
        }

		$message = self::get_item( $id );

		if ( is_wp_error( $message ) ) {
			return $message;
		}

		$table = self::get_table_name( self::$table );
		$where = ['id' => $id ];

		// Delete Message Meta
		self::delete_meta( $id );

		// Delete Message Attachment
		if ( ! empty( $message['attachment_id'] ) ) {
			Attachment_Model::delete_item( $message['attachment_id'] );
		}

		// Delete Message
		$status = $wpdb->delete( $table, $where, '%d' );

		if ( empty( $status ) ) {
			return new WP_Error( 403, __( 'Could not delete the resource.', 'wpwax-customer-support-app' ) );
		}

        return true;
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
	 * Get Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 * @param mixed $default
	 *
	 * @return mixed Value
	 */
	public static function get_meta( $object_id, $meta_key = '', $default = '' ) {

		return parent::_get_meta( $object_id, $meta_key, $default, self::$meta_table, self::$table_relation_column );

	}

	/**
	 * Update Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 * @param mixed $value
	 *
	 * @return mixed Value
	 */
	public static function update_meta( $object_id, $meta_key = '', $value = '' ) {

		return parent::_update_meta( $object_id, $meta_key, $value, self::$meta_table, self::$table_relation_column );

	}

	/**
	 * Delete Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 *
	 * @return bool Status
	 */
	public static function delete_meta( $object_id, $meta_key = '' ) {

		return parent::_delete_meta( $object_id, $meta_key, self::$meta_table, self::$table_relation_column );

	}

	/**
	 * Check if meta key exists
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 *
	 * @return mixed Status
	 */
	public static function meta_key_exists( $object_id, $meta_key = '' ) {

		return parent::_meta_key_exists( $object_id, $meta_key, self::$meta_table, self::$table_relation_column );

	}

}

