<?php

namespace HelpGent\Module\Core\Model;

use \WP_Error;
use HelpGent\Model\DB_Model;
use HelpGent\Base\Helper;

class Attachment_Model extends DB_Model {

    /**
     * Table Name
     *
     * @var string
     */
    public static $table = 'attachments';

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
        $default['where'] = [];

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		if ( $args['order'] == 'oldest' ) {
			$order = ' ORDER BY created_at ASC';
		} else {
			$order = ' ORDER BY created_at DESC';
		}

		$where = self::prepare_where_query( $args['where'], $table );

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
            $message = __( 'The resource ID is required.', 'helpgent' );
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

		$table   = self::get_table_name( self::$table );
        $default = [];

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

        if ( ! isset( $args['file'] ) && empty( $args['url'] ) ) {
            $message = __( 'Required file or url is missing', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        if ( isset( $args['file'] ) ) {
            $file = Helper\handle_media_upload( $args['file'] );

            if ( ! empty( $file['error'] ) ) {
                return new WP_Error( 403, $file['error'] );
            }

            $args['url']        = $file['url'];
            $args['media_type'] = $file['type'];

            unset( $args['file'] );
        }

        $time = current_time( 'mysql', true );

        $args['created_at'] = $time;

        if ( isset( $args['id'] ) ) {
            unset( $args['id'] );
        }

		$result = $wpdb->insert( $table, $args );

        if ( ! $result ) {
            $message = __( 'Could not create the attachment.', 'helpgent' );
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
            $message = __( 'The resource ID is required.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        $id = $args['id'];

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $id );

        if ( empty( $old_data ) ) {
            $message = __( 'The resource not found.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        if ( isset( $args['media_type'] ) ) {
            unset( $args['media_type'] );
        }

        $args = ( is_array( $args ) ) ? array_merge( $old_data, $args ) : $old_data;

        $where  = [ 'id' => $id ];
        $result = $wpdb->update( $table, $args, $where );

        if ( false === $result ) {
            $message = __( 'Could not update the resource.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $id );
    }

    /**
     * Delete Item
     *
     * @param int $id
     * @return bool|WP_Error
     */
    public static function delete_item( $id ) {
        global $wpdb;

        $old_data = self::get_item( $id );

        if ( is_wp_error( $old_data ) ) {
            return $old_data;
        }

        $url = $old_data['url'];

		$table = self::get_table_name( self::$table );
		$where = ['id' => $id ];

		$status = $wpdb->delete( $table, $where );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'helpgent' );
            return new WP_Error( 403, $message );
        }

        Helper\delete_file_by_url( $url );

        return true;
    }

}

