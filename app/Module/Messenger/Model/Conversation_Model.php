<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Core\Model\Term_Model;

class Conversation_Model extends DB_Model {

    /**
     * Main Table
     *
     * @var string
     */
    public static $table = 'conversations';

	/**
     * Table Relation Column
     *
     * @var string
     */
    public static $table_relation_column = 'conversation_id';

	/**
     * Meta Table Name
     *
     * @var string
     */
    public static $meta_table = 'conversation_meta';

	/**
     * Term Table
     *
     * @var string
     */
    public static $term_relationship_table = 'conversation_term_relationships';

	/**
     * Message Table
     *
     * @var string
     */
    public static $messages_table = 'messages';

    /**
     * Get Items
     *
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [], $debug = false ) {
        global $wpdb;

		$conversation_table       = self::get_table_name( self::$table );
		$conversation_meta_table  = self::get_table_name( self::$meta_table );
		$term_relationships_table = self::get_table_name( self::$term_relationship_table );
		$messages_table           = self::get_table_name( self::$messages_table );

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
        $default['status']     = 'active';

		$add_terms = ( ! empty( $args['add_terms'] ) ) ? Helper\convert_string_to_int_array( $args['add_terms'] ) : [];

        $args = Helper\filter_params( $default, $args );
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

		$conversation_id = $wpdb->insert_id;

		// Add terms
		if ( ! empty( $add_terms ) ) {
			self::add_terms( $conversation_id, $add_terms );
		}

		$onversation = self::get_item( $conversation_id );

		return $onversation;
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

		$add_terms    = ( ! empty( $args['add_terms'] ) ) ? Helper\convert_string_to_int_array( $args['add_terms'] ) : [];
		$remove_terms = ( ! empty( $args['remove_terms'] ) ) ? Helper\convert_string_to_int_array( $args['remove_terms'] ) : [];

        $args = Helper\filter_params( $old_data, $args );

        $time = current_time( 'mysql', true );
        $args['updated_at'] = $time;

        $where = ['id' => $args['id'] ];

		$result = $wpdb->update( $table, $args, $where, null, '%d' );

        if ( empty( $result ) ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		// Add terms
		if ( ! empty( $add_terms ) ) {
			self::add_terms( $args['id'], $add_terms );
		}

		// Remove terms
		if ( ! empty( $remove_terms ) ) {
			self::remove_terms( $args['id'], $remove_terms );
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
		$where = self::prepare_where_query_v2( $where );

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

		$conversation = self::get_item( $id );

		if ( is_wp_error( $conversation ) ) {
			return $conversation;
		}

		$table = self::get_table_name( self::$table );
		$where = [ 'id' => $id ];

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

	/**
	 * Get Terms
	 *
	 * @param int $item_id
	 *
	 * @return array Terms
	 */
	public static function get_terms( $item_id ) {

		return Conversation_Term_Relationship_Model::get_item( $item_id );

	}

	/**
	 * Add terms to item
	 *
	 * @param int $item_id
	 * @param array $terms
	 *
	 * @return void
	 */
	public static function add_terms( $item_id, $terms ) {
		if ( empty( $terms ) ) {
			return;
		}

		foreach( $terms as $term_id ) {

			$term = Term_Model::get_item( $term_id );

			if ( is_wp_error( $term ) ) {
				continue;
			}

			Conversation_Term_Relationship_Model::create_item([
				'conversation_id'  => $item_id,
				'term_taxonomy_id' => $term['term_taxonomy_id'],
			]);

		}
	}

	/**
	 * Remove terms from item
	 *
	 * @param int $item_id
	 * @param array $terms
	 *
	 * @return void
	 */
	public static function remove_terms( $item_id, $terms ) {
		if ( empty( $terms ) ) {
			return;
		}

		foreach( $terms as $term_id ) {

			$term = Term_Model::get_item( $term_id );

			if ( is_wp_error( $term ) ) {
				continue;
			}

			Conversation_Term_Relationship_Model::delete_item_where([
				'conversation_id'  => $item_id,
				'term_taxonomy_id' => $term['term_taxonomy_id'],
			]);

		}
	}

}

