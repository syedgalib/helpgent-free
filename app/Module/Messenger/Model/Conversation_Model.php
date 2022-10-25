<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Base\Helper;

class Conversation_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'conversations';

    /**
     * Get Items
     *
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [], $debug = false ) {
        global $wpdb;

		$conversation_table       = self::get_table_name( self::$table );
		$conversation_meta_table  = self::get_table_name( 'conversation_meta' );
		$messages_table           = self::get_table_name( 'messages' );
		$term_relationships_table = self::get_table_name( 'conversation_term_relationships' );

		$default = [];

        $default['limit']    = 20;
        $default['page']     = 1;
        $default['order_by'] = 'latest';

		$args  = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		// Pagination
		$limit = $args['limit'];

		if ( $limit < 0 ) {
			$limit = null;
		}

		$offset     = ( ! is_null( $limit ) ) ? ( $limit * $args['page'] ) - $limit : null;
		$pagination = ( ! is_null( $limit ) ) ? " LIMIT $limit OFFSET $offset" : '';

		// Prepare Order
        switch ( $args['order_by'] ) {
            case 'latest':
                $order = " ORDER BY conversation.created_at DESC";
                break;

            case 'oldest':
                $order = " ORDER BY conversation.created_at ASC";
                break;

            default:
                $order = " ORDER BY conversation.created_at DESC";
                break;
        }

		// Where Query
		$tax_query_count  = 0;
		$meta_query_count = 0;

		$table_field_map = [
			'id'         => 'conversation',
			'title'      => 'conversation',
			'status'     => 'conversation',
			'created_at' => 'conversation',
			'updated_at' => 'conversation',
			'user_email' => 'message',
		];

		$where = self::prepare_where_query_v2( $args['where'], $table_field_map, $tax_query_count, $meta_query_count );

		$group_by = " GROUP BY conversation.id";

		$fields = "conversation.*,";
		$fields .= "GROUP_CONCAT( DISTINCT message.user_email ) as user_emails";

		$join = "";

		// Join Message Meta Tables
		if ( ! empty( $meta_query_count )  ) {
			for ( $i = 0; $i < $meta_query_count; $i++ ) {
				$join .= " LEFT JOIN $conversation_meta_table as meta_$i ON conversation.id = meta_$i.conversation_id";
			}
		}

		// Join Message Table
		$join .= " LEFT JOIN $messages_table as message ON conversation.id = message.conversation_id";

		// Join Term Table
		if ( ! empty( $tax_query_count )  ) {
			for ( $i = 0; $i < $tax_query_count; $i++ ) {
				$join .= " LEFT JOIN $term_relationships_table as term_taxonomy_$i ON conversation.id = term_taxonomy_$i.conversation_id";
			}
		}

		$select = "SELECT $fields FROM $conversation_table as conversation";
		$query  = $select . $join . $where . $group_by . $order . $pagination;

		$results = $wpdb->get_results( $query, ARRAY_A );

		// Prepare Result Item
		if ( ! empty( $results ) ) {
			foreach( $results as $index => $item ) {
				$results[ $index ] = self::prepare_result_item( $item );
			}
		}

		return $results;
    }

	/**
	 * Get Meta
	 *
	 * @param int $conversation_id
	 * @param string $meta_key
	 * @param mixed $default
	 *
	 * @param mixed Value
	 */
	public static function get_meta( $conversation_id, $meta_key = '', $default = '' ) {
		global $wpdb;

		$meta_table = self::get_table_name( 'conversation_meta' );

		$where = " WHERE conversation_id = '$conversation_id'";

		if ( ! empty( $meta_key ) ) {
			$where .= " AND meta_key = '$meta_key'";
		}

		$select   = "SELECT * FROM $meta_table";
		$group_by = " GROUP BY meta_key";

		$query = $select . $where . $group_by;

		$result = ( ! empty( $meta_key ) ) ? $wpdb->get_row( $query, ARRAY_A ) : $wpdb->get_results( $query, ARRAY_A );

		if ( empty( $result ) ) {
			return $default;
		}

		return $result['meta_value'];
	}

	/**
	 * Create Meta
	 *
	 * @param int $conversation_id
	 * @param string $meta_key
	 * @param mixed $default
	 *
	 * @param mixed Value
	 */
	public static function create_meta( $conversation_id, $meta_key = '', $value = '' ) {
		global $wpdb;

		$meta_key_exists = self::meta_key_exists( $conversation_id, $meta_key );

		if ( $meta_key_exists ) {
			return new WP_Error( 403, __( 'The resource already exists', 'wpwax-customer-support-app' ) );
		}

		$table = self::get_table_name( 'conversation_meta' );

		$args = [
			'conversation_id' => $conversation_id,
			'meta_key'        => $meta_key,
			'meta_value'      => $value,
		];

		$result = $wpdb->insert( $table, $args );

		if ( empty( $result ) ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$meta = self::get_meta( $conversation_id, $meta_key );

		return $meta;
	}

	/**
	 * Update Meta
	 *
	 * @param int $conversation_id
	 * @param string $meta_key
	 * @param mixed $default
	 *
	 * @param mixed Value
	 */
	public static function update_meta( $conversation_id, $meta_key = '', $value = '' ) {
		global $wpdb;

		$meta_key_exists = self::meta_key_exists( $conversation_id, $meta_key );

		if ( ! $meta_key_exists ) {
			return self::create_meta( $conversation_id, $meta_key, $value );
		}

		$table = self::get_table_name( 'conversation_meta' );

		$args = [ 'meta_value' => $value ];

		$where = [
			'conversation_id' => $conversation_id,
			'meta_key'        => $meta_key,
		];

		$result = $wpdb->update( $table, $args, $where );

		if ( is_null( $result ) ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$meta = self::get_meta( $conversation_id, $meta_key );

		return $meta;
	}

	/**
	 * Update Meta
	 *
	 * @param int $conversation_id
	 * @param string $meta_key
	 * @param mixed $default
	 *
	 * @param mixed Value
	 */
	public static function delete_meta( $conversation_id, $meta_key = '' ) {
		global $wpdb;

		$meta_key_exists = self::meta_key_exists( $conversation_id, $meta_key );

		if ( ! $meta_key_exists ) {
			return true;
		}

		$table = self::get_table_name( 'conversation_meta' );

		$where = [
			'conversation_id' => $conversation_id,
			'meta_key'        => $meta_key,
		];

		$status = $wpdb->delete( $table, $where );

		if ( empty( $status ) ) {
			return new WP_Error( 403, __( 'Could not delete the resource.', 'wpwax-customer-support-app' ) );
		}

		return true;
	}

	/**
	 * Check if meta key exists
	 *
	 * @param int $conversation_id
	 * @param string $meta_key
	 *
	 * @param bool Status
	 */
	public static function meta_key_exists( $conversation_id, $meta_key ) {
		global $wpdb;

		$meta_table = self::get_table_name( 'conversation_meta' );

		$where = " WHERE conversation_id = '$conversation_id'";
		$where .= " AND meta_key = '$meta_key'";

		$select   = "SELECT * FROM $meta_table";
		$group_by = " GROUP BY meta_key";

		$query  = $select . $where . $group_by;
		$result = $wpdb->get_row( $query, ARRAY_A );

		return ( ! empty( $result ) ) ? true : false;
	}

	/**
	 * Prepare Result Item
	 *
	 * @param array $item
	 * @return array Item
	 */
	protected static function prepare_result_item( $item = [] ) {

		// Add Terms Data
		$item['terms'] = Conversation_Term_Relationship_Model::get_items([
			'where' => [
				'terms' => [
					'key'     => 'conversation_id',
					'compare' => '=',
					'value'   => $item['id'],
				]

			]
		]);

		return $item;
	}

	/**
	 * Parse Where Query Value
	 *
	 * @param string $compare
	 * @param mixed $value
	 *
	 * @return string Value
	 */
	protected static function parse_where_query_value( $compare = '=', $value = '' ) {
		switch ( strtolower( $compare ) ) {
			case 'in':
				$value = "('$value')";
				break;

			case 'like':
				$value = "'%$value%'";
				break;

			default:
				$value = "'$value'";
				break;
		}

		return $value;
	}

	/**
	 * Prepare Where Updated On Query
	 *
	 * @param array $args
	 * @return void
	 */
	protected static function prepare_where_updated_at_query( &$args = [] ) {

		if ( ! ( isset( $args['where']['updated_at'] ) || isset( $args['where']['updated_at_between'] ) ) ) {
			return;
		}

		self::prepare_where_date_time_on_query( 'updated_at', $args );
	}


	/**
	 * Prepare Where Updated On Query
	 *
	 * @param array $args
	 * @return void
	 */
	protected static function prepare_where_date_time_on_query( $field_name, &$args = [] ) {
		// Compare Date Between
		$field_between_key = $field_name . '_between';

		if ( ! empty( $args['where'][ $field_between_key ] ) ) {
			$between_dates = $args['where'][ $field_between_key ];
			$dates         = explode( ',', trim( $between_dates ) );

			if ( count( $dates ) !== 2 ) {
				unset( $args['where'][ $field_between_key ] );
				return;
			}

			$from_date = Helper\format_as_sql_date_time( $dates[0] );
			$to_date   = Helper\format_as_sql_date_time( $dates[1] );

			if ( empty( $from_date ) || empty( $to_date ) ) {
				unset( $args['where'][ $field_between_key ] );
				return;
			}

			$args['where'][ $field_between_key ] = [
				'condition' => 'AND',
				'rules' => [
					[
						'field'     => "message.{$field_name}",
						'compare'   => 'BETWEEN',
						'value'     => "'{$from_date}' AND '{$to_date}'",
					]
				]

			];

			return;
		}

		// Compare Date
		$field_date_time = Helper\format_sql_date_time_as_array( $args['where'][ $field_name ] );

		if ( empty( $field_date_time )  ) {
			unset( $args['where'][ $field_name ] );
			return;
		}

		$accepted_comparations = [ 'null', '=', '!=', '>', '<', '>=', '<=' ];
		$compare_date_time = '=';

		if ( isset( $args['where'][ "{$field_name}_compare_date_time" ] ) ) {
			$compare_date_time = ( in_array( $args['where'][ "{$field_name}_compare_date_time" ], $accepted_comparations ) ) ? $args['where'][ "{$field_name}_compare_date_time" ] : '=';
			unset( $args['where'][ "{$field_name}_compare_date_time" ] );

			$args['where'][ $field_name ] = [
				'field'     => "message.{$field_name}",
				'compare'   => $compare_date_time,
				'value'     => "'" . $args['where'][ $field_name ] . "'",
			];

			return;
		}

		$compare_day       = '=';
		$compare_month     = '=';
		$compare_year      = '=';

		if ( isset( $args['where'][ "{$field_name}_compare_day" ] ) ) {
			$compare_day = ( in_array( $args['where'][ "{$field_name}_compare_day" ], $accepted_comparations ) ) ? $args['where'][ "{$field_name}_compare_day" ] : '=';
			unset( $args['where'][ "{$field_name}_compare_day" ] );
		}

		if ( isset( $args['where'][ "{$field_name}_compare_month" ] ) ) {
			$compare_month = ( in_array( $args['where'][ "{$field_name}_compare_month" ], $accepted_comparations ) ) ? $args['where'][ "{$field_name}_compare_month" ] : '=';
			unset( $args['where'][ "{$field_name}_compare_month" ] );
		}

		if ( isset( $args['where'][ "{$field_name}_compare_year" ] ) ) {
			$compare_year = ( in_array( $args['where'][ "{$field_name}_compare_year" ], $accepted_comparations ) ) ? $args['where'][ "{$field_name}_compare_year" ] : '=';
			unset( $args['where'][ "{$field_name}_compare_year" ] );
		}

		$rules = [];

		if ( 'null' !== $compare_day ) {
			$rules[] = [
				'field'     => "DAY( message.{$field_name} )",
				'compare'   => $compare_day,
				'value'     => $field_date_time['day'],
			];
		}

		if ( 'null' !== $compare_month ) {
			$rules[] = [
				'field'     => "MONTH( message.{$field_name} )",
				'compare'   => $compare_month,
				'value'     => $field_date_time['month'],
			];
		}

		if ( 'null' !== $compare_year ) {
			$rules[] = [
				'field'     => "YEAR( message.{$field_name} )",
				'compare'   => $compare_year,
				'value'     => $field_date_time['year'],
			];
		}

		$args['where'][ $field_name ] = [
			'condition' => 'AND',
			'rules'     => $rules
		];
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

		$conversation_table = self::get_table_name( self::$table );
		$query = $wpdb->prepare( "SELECT * FROM $conversation_table WHERE id = %d", array( $id ) );

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

        $default['created_by'] = '';
        $default['title']      = '';
        $default['status']     = 'publish';

        $args = Helper\merge_params( $default, $args );
        $time = current_time( 'mysql', true );

        $args['created_at'] = $time;
        $args['updated_at'] = $time;

        if ( isset( $args['id'] ) ) {
            unset( $args['id'] );
        }

        if ( empty( $args['created_by'] ) ) {
            $message = __( 'Author email is required.', 'wpwax-customer-support-app' );
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

        $where = ['id' => $args['id'] ];

		$result = $wpdb->update( $table, $args, $where, null, '%d' );

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

		$status = $wpdb->delete( $table, $where, '%d' );

		if ( empty( $status ) ) {
			return new WP_Error( 403, __( 'Could not delete the resource.', 'wpwax-customer-support-app' ) );
		}

		// Mark as seen by author
		Messages_Seen_By_Model::delete_item_where([
			'user_id'    => $message['user_id'],
			'message_id' => $message['id'],
			'session_id' => $message['session_id'],
		]);

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

}

