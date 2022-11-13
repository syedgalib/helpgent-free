<?php

namespace HelpGent\Module\Core\Model;

use \WP_Error;
use HelpGent\Model\DB_Model;
use HelpGent\Base\Helper;

class Guest_User_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'guest_users';

	/**
     * Table Relation Column
     *
     * @var string
     */
    public static $table_relation_column = 'user_id';

	/**
     * Meta Table Name
     *
     * @var string
     */
    public static $meta_table = 'guest_user_meta';


	/**
     * Get Items
     *
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [] ) {
        global $wpdb;

		$table           = self::get_table_name( self::$table );
		$meta_table      = self::get_table_name( self::$meta_table );
		$relation_column = self::$table_relation_column;

        $default = [];

        $default['id']         = null;
        $default['name']       = null;
        $default['email']      = null;
        $default['created_at'] = null;
        $default['limit']      = 20;
        $default['page']       = 1;
        $default['where']      = null;

		$args = Helper\merge_params( $default, $args );

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		$table_field_map  = [
			'id'         => 'user',
			'email'      => 'user',
			'name'       => 'user',
			'created_at' => 'user',
		];

		$tax_query_count  = 0;
		$meta_query_count = 0;

		$where_args = ( ! empty( $args['where'] ) ) ? $args['where'] : [];
		$where      = self::prepare_where_query_v2( $where_args, $table_field_map, $tax_query_count, $meta_query_count );

		$select = "SELECT user.* FROM $table as user";
		$join   = '';

		// Join Meta Table
		if ( ! empty( $meta_query_count )  ) {
			for ( $i = 0; $i < $meta_query_count; $i++ ) {
				$join .= " LEFT JOIN $meta_table as meta_$i ON user.id = meta_$i.$relation_column";
			}
		}

		$query = $select . $join . $where . " LIMIT $limit OFFSET $offset";

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
            $message = __( 'The user ID is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

		$table = self::get_table_name( self::$table );

		$query = $wpdb->prepare( "SELECT * FROM $table WHERE id = %d", array( $id ) );

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

        $default = [
			'email'      => '',
			'name'       => '',
			'created_at' => current_time( 'mysql', true ),
		];

        $meta_args = Helper\exclude_params( $default, $args );
        $args      = Helper\merge_params( $default, $args );

		if ( empty( $args['name'] ) ) {
			$message = __( 'Name is required.', 'helpgent' );
            return new WP_Error( 403, $message );
		}

		if ( empty( $args['email'] ) ) {
			$message = __( 'Email is required.', 'helpgent' );
            return new WP_Error( 403, $message );
		}

		if ( ! is_email( $args['email'] ) ) {
			$message = __( 'A valid email is required.', 'helpgent' );
            return new WP_Error( 403, $message );
		}

		if ( self::user_exists( $args['email'], false ) ) {
			$message = __( 'The email is already registered.', 'helpgent' );
            return new WP_Error( 403, $message );
		}

		$result = $wpdb->insert( $table, $args );

        if ( ! $result ) {
            $message = __( 'Could not create the resource.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

		$item_id = $wpdb->insert_id;

		// Update Metas
		if ( ! empty( $meta_args ) ) {
			foreach( $meta_args as $meta_key => $meta_value ) {
				self::update_meta( $item_id, $meta_key, $meta_value );
			}
		}

        return self::get_item( $item_id );
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
            $message = __( 'User ID is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        $id = $args['id'];

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $id );

        if ( is_wp_error( $old_data ) ) {
            $message = __( 'The resource not found.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

		$meta_args = Helper\exclude_params( $old_data, $args );
		$args      = Helper\merge_params( $old_data, $args );

		if ( ! empty( $args['email'] ) && $args['email'] !== $old_data['email'] && self::user_exists( $args['email'], false ) ) {
			$message = __( 'The email is already in use.', 'helpgent' );
            return new WP_Error( 403, $message );
		}

        $where = [ 'id' => $id ];

        $result = $wpdb->update( $table, $args, $where, null, '%d' );

        if ( false === $result ) {
            $message = __( 'Could not update the resource.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

		// Update Metas
		if ( ! empty( $meta_args ) ) {
			foreach( $meta_args as $meta_key => $meta_value ) {

				if ( is_null( $meta_value ) || is_string( $meta_value ) && 'null' === strtolower( $meta_value ) ) {
					self::delete_meta( $id, $meta_key );
					continue;
				}

				self::update_meta( $id, $meta_key, $meta_value );
			}
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
            $message = __( 'User ID is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

		$user = self::get_item( $id );

		if ( is_wp_error( $user ) ) {
			return $user;
		}

		$table = self::get_table_name( self::$table );
		$where = ['id' => $id ];

		$status = $wpdb->delete( $table, $where, '%s' );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

		// Delete Meta
		self::delete_meta( $id );

		// Delete Token
		Auth_Token_Model::delete_item( $user['email'] );

        return ( ! empty( $status ) ) ? true : false;
    }

	/**
	 * Check if user exists
	 *
	 * @param string $email
	 * @return bool|WP_Error
	 */
	public static function user_exists( $email, $check_only_geust_user = true ) {

		if ( ! is_email( $email ) ) {
			$message = __( 'A valid email is required.', 'helpgent' );
            return new WP_Error( 403, $message );
		}

		if ( ! $check_only_geust_user ) {
			$wp_user = get_user_by( 'email', $email );

			if ( ! empty( $wp_user ) ) {
				return true;
			}
		}

		$user = self::get_items([
			'where' => [
				'email' => $email,
			]
		]);

		if ( empty( $user ) ) {
			return false;
		}

		return true;
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

