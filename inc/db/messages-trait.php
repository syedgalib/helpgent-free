<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm\db;

trait Messages_Trait {

	public static function get_message( $message_id ) {
		global $wpdb;

		$table = self::get_table( 'messages' );

		$query = $wpdb->prepare( "SELECT * FROM $table WHERE message_id = %d", array( $message_id ) );

		$result = $wpdb->get_row( $query, ARRAY_A );

		if ( ! empty( $result['messages'] ) ) {
			$result['messages'] = maybe_unserialize( $result['messages'] );
		}

		return $result;
	}


	public static function get_messages( $args ) {
		global $wpdb;

		$t_messages = self::get_table( 'messages' );

		$limit  = 20;
		$offset = ( $limit * $args['page'] ) - $limit;

		if ( $args['order'] == 'oldest' ) {
			$order = ' ORDER BY start_time ASC';
		} else {
			$order = ' ORDER BY updated_time DESC';
		}

		$where = ' WHERE 1=1';

		if ( $args['read_status'] == 'read' ) {
			$where .= ' AND is_read=1';
		} elseif ( $args['read_status'] == 'unread' ) {
			$where .= ' AND is_read=0';
		}

		$select = "SELECT message_id,name,updated_time,is_read FROM $t_messages";

		$query = $select . $where . $order . " LIMIT $limit OFFSET $offset";
		return $wpdb->get_results( $query );
	}

	public static function create_message( $args ) {
		global $wpdb;

		$table = self::get_table( 'messages' );

		$time = current_time( 'mysql', true );

		$message = array(
			'by'   => 'user',
			'time' => $time,
			'type' => $args['message_type'],
		);

		if ( $args['message_type'] == 'text' ) {
			$message['text'] = $args['message_data'];
		}

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
