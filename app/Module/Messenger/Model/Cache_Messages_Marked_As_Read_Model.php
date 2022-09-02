<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Base\Helper;

class Cache_Messages_Marked_As_Read_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'cache_messages_marked_as_read';

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

        $default['limit'] = 20;
        $default['page']  = 1;

        $args  = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;
        $limit = $args['limit'];

		if ( $limit < 0 ) {
			$limit = null;
		}

		$offset = ( ! is_null( $limit ) ) ? ( $limit * $args['page'] ) - $limit : null;

		$where = ' WHERE 1=1';

        // Construct where clause
        if ( ! empty( $args['where'] ) && is_array( $args[ 'where' ] ) ) {

			$supported_conditions = [ 'AND', 'OR' ];

            foreach ( $args['where'] as $key => $value ) {
				// ---> C1
				if ( ! is_array( $value ) ) {
					$where .= " AND {$key}='{$value}'";
					continue;
				}

				// ---> C2
                if ( ! empty( $value['condition'] && ! empty( $value['rules'] ) ) ) {

					$_where     = '';
					$_condition = ( ! empty( $value['condition'] ) && in_array( $value['condition'], $supported_conditions ) ) ? $value['condition'] : 'AND';

                    foreach ( $value['rules'] as $index => $rule ) {
						$_key       = $rule['field'];
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
				$_key     = $value['field'];
				$_compare = $value['compare'];
				$_value   = $value['value'];

				$where .= " AND {$_key} {$_compare} {$_value}";
            }

        }

		$fields = [ '*' ];

		if ( ! empty( $args['fields'] ) ) {
			$_fields = preg_replace( "/\s/", '', $args['fields'] );
			$_fields = trim( $_fields, ',' );
			$_fields = explode( ',', $_fields );
			$fields  = ( is_array( $_fields ) ) ? $_fields : $fields;

			if ( is_array( $_fields ) ) {
				$fields  = $_fields;
			}
		}

		$fields = join( ', ', $fields );
		$fields = trim( $fields, ', ' );

		$select     = "SELECT $fields FROM $table";
		$pagination = ( ! is_null( $limit ) ) ? " LIMIT $limit OFFSET $offset" : '';
		$query      = $select . $where . $pagination;

		return $wpdb->get_results( $query, ARRAY_A );

    }


    /**
     * Get Item Where
     *
     * @param int $id
     * @return array|WP_Error
     */
    public static function get_item_where( $args = [] ) {
        global $wpdb;

        if ( empty( $args['user_id'] ) ) {
			$message = __( 'User ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		if ( empty( $args['message_id'] ) ) {
			$message = __( 'Message ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		if ( empty( $args['session_id'] ) ) {
			$message = __( 'Session ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		$result = self::get_items( [ 'where' => $args ] );

        if ( empty( $result ) ) {
            $message = __( 'Could not find the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		return $result[0];
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

        $default['user_id']    = 0;
        $default['session_id'] = '';
        $default['message_id'] = 0;

		$args = Helper\merge_params( $default, $args );

		if ( empty( $args['user_id'] ) ) {
			$message = __( 'User ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		if ( empty( $args['message_id'] ) ) {
			$message = __( 'Message ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

		if ( empty( $args['session_id'] ) ) {
			$message = __( 'Session ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
		}

        $result = $wpdb->insert( $table, $args );

        if ( empty( $result ) ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$items = self::get_items( [ 'where' => $args ] );
		$item  = ( ! empty( $items ) ) ? $items[0] : [];

		return $item;
    }

    /**
     * Update Item
     *
     * @param array $args
     * @return array|WP_Error
     */
    public static function update_item_where( $where = [], $new_data = [] ) {
        global $wpdb;

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item_where( $where );

        if ( is_wp_error( $old_data ) ) {
            return $old_data;
        }

        $new_data = Helper\filter_params( $old_data, $new_data );
        $result   = $wpdb->update( $table, $new_data, $where, null );

        if ( empty( $result ) ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item_where( $new_data );
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

