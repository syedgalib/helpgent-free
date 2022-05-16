<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm\db;

trait Messages_Trait {


	// id, name, time, tag, is_read
	// page:(int), read_status:all,read,unread, order:latest,oldest, tags: empty/array
	public static function get_messages( $args ) {
		global $wpdb;

		$t_messages  = self::get_table( 'messages' );

		$limit  = 20;
		$offset = ( $limit * $args['page'] ) - $limit;

		$where = ' WHERE 1=1';

		if ( $args['read_status'] == 'read' ) {
			$where .= ' AND is_read=1';
		} elseif ( $args['read_status'] == 'unread' ) {
			$where .= ' AND is_read=0';
		}

		$select  = "SELECT message_id,name,updated_time,is_read FROM $t_messages";

		if ( $args['tags'] ) {
			# code...
		}



		$query = $select . $where . " LIMIT $limit OFFSET $offset";
		return $wpdb->get_results( $query );
	}

	public static function create_message( $args ) {
		global $wpdb;

		$table = self::get_table( 'messages' );

		$time = current_time( 'mysql', true );

		$message = array(
			'user_type'    => 'customer',
			'time'         => $time,
			'message_type' => $args['message_type'],
			'message_data' => json_decode( $args['message_data'], true ),
		);

		$messages = array( $message );
		$messages = maybe_serialize( $messages );

		$data = array(
			'start_time'   => $time,
			'updated_time' => $time,
			'name'         => $args['name'],
			'email'        => $args['email'],
			'messages'     => $messages,
			'is_read'      => false,
		);

		$result = $wpdb->insert( $table, $data );

		return $result ? $wpdb->insert_id : false;
	}
}
