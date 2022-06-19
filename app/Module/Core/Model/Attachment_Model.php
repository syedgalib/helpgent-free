<?php

namespace WPWaxCustomerSupportApp\Module\Core\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Root\Helper;

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
     * @param WP_REST_Request $request
     * @return array
     */
    public static function get_items( $request ) {
        global $wpdb;

        $args  = $request->get_params();
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
     * @param WP_REST_Request $request
     * @return array|WP_Error
     */
    public static function get_item( $request ) {
        global $wpdb;

        $args = $request->get_params();
        $id   = $args['id'];

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
     * @param WP_REST_Request $request
     * @return array|WP_Error
     */
    public static function create_item( $request ) {
        global $wpdb;

        $args = $request->get_params();
		$table = self::get_table_name( self::$table );

        $default = [];

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

        if ( ! isset( $args['file'] ) && empty( $args['link'] ) ) {
            $message = __( 'Required file or link is missing', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( isset( $args['file'] ) ) {
            $file = Helper\handle_media_upload( $args['file'] );

            if ( ! empty( $file['error'] ) ) {
                return new WP_Error( 403, $file['error'] );
            }

            if ( empty( $args['title'] ) ) {
                $file_name = $args['file']['name'];
                $args['title'] = preg_replace( '/\..+$/', '', $file_name );
            }

            $args['link']       = $file['url'];
            $args['media_type'] = $file['type'];

            unset( $args['file'] );
        }

        $time = current_time( 'mysql', true );

        $args['created_on'] = $time;
        $args['updated_on'] = $time;

        if ( isset( $args['id'] ) ) {
            unset( $args['id'] );
        }

        if ( isset( $args['expires_on'] ) && empty( $args['expires_on'] ) ) {
            $args['expires_on'] = null;
        }

		$result = $wpdb->insert( $table, $args );

        if ( ! $result ) {
            $message = __( 'Could not create the attachment.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $wpdb->insert_id );
    }

    /**
     * Update Item
     * 
     * @param WP_REST_Request $request
     * @return array|WP_Error
     */
    public static function update_item( $request ) {
        global $wpdb;

        $args = $request->get_params();
        $id   = $args['id'];
        
        if ( empty( $id ) ) {
            $message = __( 'The resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $id );

        if ( empty( $old_data ) ) {
            $message = __( 'The resource not found.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( isset( $args['link'] ) ) {
            unset( $args['link'] );
        }

        if ( isset( $args['media_type'] ) ) {
            unset( $args['media_type'] );
        }

        $args = ( is_array( $args ) ) ? array_merge( $old_data, $args ) : $old_data;

        $time = current_time( 'mysql', true );
        $args['updated_on'] = $time;
        

        if ( isset( $args['expires_on'] ) && empty( $args['expires_on'] ) ) {
            $args['expires_on'] = null;
        }

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
     * @param WP_REST_Request $request
     * @return bool|WP_Error
     */
    public static function delete_item( $request ) {
        global $wpdb;

        $args = $request->get_params();
        $id   = $args['id'];

        $old_data = self::get_item( $id );

        if ( is_wp_error( $old_data ) ) {
            return $old_data;
        }

        $link = $old_data['link'];

		$table = self::get_table_name( self::$table );
		$where = ['id' => $id ];

		$status = $wpdb->delete( $table, $where, '%d' );

        if ( empty( $status ) ) {
            $message = __( 'Could not delete the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        Helper\delete_file_by_url( $link );

        return true;
    }

}

