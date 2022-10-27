<?php

namespace WPWaxCustomerSupportApp\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Base\Helper;

abstract class DB_Model implements DB_Model_Interface {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = '';

	/**
     * Table Relation Column
     *
     * @var string
     */
    public static $table_relation_column = '';

	/**
     * Meta Table
     *
     * @var string
     */
    public static $meta_table = '';

	/**
     * Term Table
     *
     * @var string
     */
    public static $term_relationship_table = '';


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
     * @return array|WP_Error
     */
    public static function get_item( $id ) {
        global $wpdb;

        if ( empty( $id ) ) {
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
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
     * @return array|WP_Error
     */
    public static function create_item( $args = [] ) {
        global $wpdb;

        $table = self::get_table_name( self::$table );

        $default = [];

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

        $time = current_time( 'mysql', true );

        $args['created_on'] = $time;
        $args['updated_on'] = $time;

        if ( ! isset( $args['id'] ) ) {
            unset( $args['id'] );
        }

		$result = $wpdb->insert( $table, $args );

        if ( ! $result ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $wpdb->insert_id );
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

	/**
	 * Get Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 * @param mixed $default
	 * @param string $meta_table
	 * @param string $relation_column
	 *
	 * @return mixed Value
	 */
	protected static function _get_meta( $object_id, $meta_key = '', $default = '', $meta_table = '', $relation_column = '' ) {
		global $wpdb;

		$table = self::get_table_name( $meta_table );
		$where = " WHERE $relation_column = '$object_id'";

		if ( ! empty( $meta_key ) ) {
			$where .= " AND meta_key = '$meta_key'";
		}

		$select   = "SELECT * FROM $table";
		$group_by = " GROUP BY meta_key";

		$query = $select . $where . $group_by;

		$result = ( ! empty( $meta_key ) ) ? $wpdb->get_row( $query, ARRAY_A ) : $wpdb->get_results( $query, ARRAY_A );

		if ( empty( $result ) ) {
			return $default;
		}

		if ( empty( $meta_key ) ) {
			return $result;
		}

		return $result['meta_value'];
	}

	/**
	 * Create Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 * @param mixed $value
	 * @param string $meta_table
	 * @param string $relation_column
	 *
	 * @return mixed Value
	 */
	protected static function _create_meta( $object_id, $meta_key = '', $value = '', $meta_table = '', $relation_column = '' ) {
		global $wpdb;

		$meta_key_exists = self::_meta_key_exists( $object_id, $meta_key, $meta_table, $relation_column );

		if ( $meta_key_exists ) {
			return new WP_Error( 403, __( 'The resource already exists', 'wpwax-customer-support-app' ) );
		}

		$table = self::get_table_name( $meta_table );

		$args = [
			$relation_column => $object_id,
			'meta_key'       => $meta_key,
			'meta_value'     => $value,
		];

		$result = $wpdb->insert( $table, $args );

		if ( empty( $result ) ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$meta = self::_get_meta( $object_id, $meta_key, '', $meta_table, $relation_column );

		return $meta;
	}

	/**
	 * Update Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 * @param mixed $default
	 * @param string $meta_table
	 * @param string $relation_column
	 *
	 * @return mixed Value
	 */
	protected static function _update_meta( $object_id, $meta_key = '', $value = '', $meta_table = '', $relation_column = '' ) {
		global $wpdb;

		$meta_key_exists = self::_meta_key_exists( $object_id, $meta_key, $meta_table, $relation_column );

		if ( ! $meta_key_exists ) {
			return self::_create_meta( $object_id, $meta_key, $value, $meta_table, $relation_column );
		}

		$table = self::get_table_name( $meta_table );

		$args = [ 'meta_value' => $value ];

		$where = [
			$relation_column => $object_id,
			'meta_key'       => $meta_key,
		];

		$result = $wpdb->update( $table, $args, $where );

		if ( is_null( $result ) ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$meta = self::_get_meta( $object_id, $meta_key, '', $meta_table, $relation_column );

		return $meta;
	}

	/**
	 * Delete Meta
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 * @param mixed $default
	 * @param string $meta_table
	 * @param string $relation_column
	 *
	 * @return bool Status
	 */
	protected static function _delete_meta( $object_id, $meta_key = '', $meta_table = '', $relation_column = '' ) {
		global $wpdb;

		$meta_key_exists = self::_meta_key_exists( $object_id, $meta_key, $meta_table, $relation_column );

		if ( ! $meta_key_exists ) {
			return true;
		}

		$table = self::get_table_name( $meta_table );

		$where = [
			$relation_column => $object_id,
		];

		if ( ! empty( $meta_key ) ) {
			$where['meta_key'] = $meta_key;
		}

		$status = $wpdb->delete( $table, $where );

		if ( empty( $status ) ) {
			return new WP_Error( 403, __( 'Could not delete the resource.', 'wpwax-customer-support-app' ) );
		}

		return true;
	}

	/**
	 * Check if meta key exists
	 *
	 * @param int $object_id
	 * @param string $meta_key
	 * @param string $meta_table
	 * @param string $relation_column
	 *
	 * @return bool Status
	 */
	protected static function _meta_key_exists( $object_id, $meta_key, $meta_table = '', $relation_column = '' ) {
		global $wpdb;

		$meta_table = self::get_table_name( $meta_table );

		$where = " WHERE $relation_column = '$object_id'";
		$where .= " AND meta_key = '$meta_key'";

		$select   = "SELECT * FROM $meta_table";
		$group_by = " GROUP BY meta_key";

		$query  = $select . $where . $group_by;
		$result = $wpdb->get_row( $query, ARRAY_A );

		return ( ! empty( $result ) ) ? true : false;
	}

    /**
     * Get Table Name
     *
     * @return string Table Name
     */
    public static function get_table_name( $table = '', $sub_prefix = WPWAX_CUSTOMER_SUPPORT_APP_DB_TABLE_PREFIX . '_' ) {
        global $wpdb;

        return $wpdb->prefix . $sub_prefix . $table;
    }


	/**
	 * Prepare Where Query
	 *
	 * @param array $where_args
	 * @param string $table_name
	 * @param array $table_prefix_fields
	 * @param array $supported_conditions
	 *
	 * @return string Where Query
	 */
	public static function prepare_where_query_v2( $where_args = [], $table_field_map = [], &$tax_query_count = 0, &$meta_query_count = 0 ) {
		$where = ' WHERE 1=1';
		$supported_conditions = [ 'AND', 'OR' ];

		if ( empty( $where_args ) ) {
			return $where;
		}

		foreach ( $where_args as $key => $value ) {

			// Term Query
			if ( $key == 'tax_query' ) {

				if ( ! is_array( $value ) ) {
					unset( $where_args[ $key ] );
					continue;
				}

				$tax_query_condition = ( ! empty( $value['condition'] ) ) ? $value['condition'] : 'AND';
				$tax_query_clause    = '';

				foreach ( $value as $tax_query_index => $tax_query ) {

					if ( ! is_numeric( $tax_query_index ) ) {
						continue;
					}

					$taxonomy_ids = Helper\get_terms_taxonomy_ids( $tax_query );
					$clause       = "( term_taxonomy_$tax_query_index.term_taxonomy_id IN ( '$taxonomy_ids' ) )";

					if ( $tax_query_index > 0 ) {
						$clause = " $tax_query_condition $clause";
					}

					$tax_query_clause .= $clause;
					$tax_query_count++;
				}

				$where .= " AND ( $tax_query_clause )";
				unset( $where_args[ $key ] );
				continue;

			}


			// Meta Query
			if ( $key == 'meta_query' ) {

				if ( ! is_array( $value) ) {
					unset( $where_args[ $key ]);
					continue;
				}

				$meta_query_condition = ( ! empty( $value['condition'] ) ) ? $value['condition'] : 'AND';
				$meta_query_clause = '';

				foreach ( $value as $meta_query_index => $meta_query ) {

					if ( ! is_numeric( $meta_query_index ) ) {
						continue;
					}

					$meta_key   = ( ! empty( $meta_query['key'] ) ) ? $meta_query['key'] : '';
					$compare    = ( ! empty( $meta_query['compare'] ) ) ? $meta_query['compare'] : '=';
					$meta_value = ( ! empty( $meta_query['value'] ) ) ? $meta_query['value'] : '';
					$meta_value = self::parse_query_value( $meta_value, $compare );

					$clause = "(
						meta_$meta_query_index.meta_key = '$meta_key'
						AND meta_$meta_query_index.meta_value $compare $meta_value
					)";

					if ( $meta_query_index > 0 ) {
						$clause = " $meta_query_condition $clause";
					}

					$meta_query_clause .= $clause;
					$meta_query_count++;
				}

				$where .= " AND ( $meta_query_clause )";

				unset( $where_args[ $key ]);
				continue;
			}


			// General Query
			// Case 1
			if ( ! is_array( $value ) ) {
				$where_table_name = ( ! empty( $table_field_map[ $key ] ) ) ? $table_field_map[ $key ] . '.' : '';
				$where .= " AND {$where_table_name}{$key}='{$value}'";
				continue;
			}

			// Case 2
			if ( ! empty( $value['condition'] ) && ! empty( $value['rules'] ) ) {

				$_where     = '';
				$_condition = ( ! empty( $value['condition'] ) && in_array( $value['condition'], $supported_conditions ) ) ? $value['condition'] : 'AND';

				foreach ( $value['rules'] as $index => $rule ) {
					$rule_key         = $rule['key'];
					$where_table_name = ( ! empty( $table_field_map[ $rule_key ] ) ) ? $table_field_map[ $rule_key ] . '.' : '';
					$_key             = $where_table_name . $rule['key'];
					$_compare         = ( ! empty( $rule['compare'] ) ) ? $rule['compare'] : '=';
					$_value           = self::parse_query_value( $rule['value'], $_compare );

					if ( $index === 0 ) {
						$_where .= " {$_key} {$_compare} {$_value}";
					} else {
						$_where .= " {$_condition} {$_key} {$_compare} {$_value}";
					}
				}

				$_where = trim( $_where );
				$where .= " AND ( $_where )";

				continue;
			}

			// Case 3
			$value_key        = $value['key'];
			$where_table_name = ( ! empty( $table_field_map[ $value_key ] ) ) ? $table_field_map[ $value_key ] . '.' : '';
			$_key             = $where_table_name . $value['key'];
			$_compare         = $value['compare'];
			$_compare         = ( ! empty( $value['compare'] ) ) ? $value['compare'] : '=';
			$_value           = self::parse_query_value( $value['value'], $_compare );

			$where .= " AND {$_key} {$_compare} {$_value}";
		}

		return $where;
	}

	/**
	 * Parse Query Value
	 *
	 * @param mixed $value
	 * @param string $compare
	 *
	 * @param mixed Value
	 */
	public static function parse_query_value( $value = '', $compare = '=' ) {

		switch ( strtolower( $compare ) ) {
			case '=':
				$value = "'$value'";
				break;

			case 'in':
				$value = "($value)";
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
	 * Prepare Where Query
	 *
	 * @param array $where_args
	 * @param string $table_name
	 * @param array $table_prefix_fields
	 * @param array $supported_conditions
	 *
	 * @return string Where Query
	 */
	public static function prepare_where_query( $where_args = [], $table_name = '', $table_prefix_fields = [], $supported_conditions = [ 'AND', 'OR' ] ) {
		$where = ' WHERE 1=1';

		if ( empty( $where_args ) ) {
			return $where;
		}

		foreach ( $where_args as $key => $value ) {

			$where_table_name = ( ! empty( $table_name ) && ! in_array( $key, $table_prefix_fields ) ) ? "{$table_name}." : '';

			// ---> C1
			if ( ! is_array( $value ) ) {
				$where .= " AND {$where_table_name}{$key}='{$value}'";
				continue;
			}

			// ---> C2
			if ( ! empty( $value['condition'] ) && ! empty( $value['rules'] ) ) {

				$_where     = '';
				$_condition = ( ! empty( $value['condition'] ) && in_array( $value['condition'], $supported_conditions ) ) ? $value['condition'] : 'AND';

				foreach ( $value['rules'] as $index => $rule ) {
					$_key       = $where_table_name . $rule['field'];
					$_compare   = $rule['compare'];
					$_value     = $rule['value'];

					if ( $index === 0 ) {
						$_where .= " {$_key} {$_compare} {$_value}";
					} else {
						$_where .= " {$_condition} {$_key} {$_compare} {$_value}";
					}
				}

				$_where = trim( $_where );
				$where .= " AND ( $_where )";

				continue;
			}

			// ---> C3
			$_key     = $where_table_name . $value['field'];
			$_compare = $value['compare'];
			$_value   = $value['value'];

			$where .= " AND {$_key} {$_compare} {$_value}";
		}

		return $where;
	}

}