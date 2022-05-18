<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm\db;

trait Messages_Trait {

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
			$where .= ' AND is_read=1 AND last_message_by="user"';
		} elseif ( $args['read_status'] == 'unread' ) {
			$where .= ' AND is_read=0 AND last_message_by="user"';
		}

		$select = "SELECT message_id,name,updated_time,is_read FROM $t_messages";

		$query = $select . $where . $order . " LIMIT $limit OFFSET $offset";
		return $wpdb->get_results( $query );
	}

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

	public static function create_message( $args ) {
		global $wpdb;

		$table = self::get_table( 'messages' );

		$time = current_time( 'mysql', true );

		$message  = self::build_message( 'user', $time, $args );
		$messages = array( $message );
		$messages = maybe_serialize( $messages );

		$data = array(
			'start_time'      => $time,
			'session'         => self::generate_session(),
			'updated_time'    => $time,
			'name'            => $args['name'],
			'email'           => $args['email'],
			'messages'        => $messages,
			'last_message_by' => 'user',
			'is_read'         => false,
		);

		$result = $wpdb->insert( $table, $data );

		return $result ? $wpdb->insert_id : false;
	}

	public static function update_message( $args ) {
		global $wpdb;

		$table = self::get_table( 'messages' );

		$message_id = $args['message_id'];

		$time        = current_time( 'mysql', true );
		$new_message = self::build_message( $args['message_by'], $time, $args );

		$old_data = self::get_message( $message_id );
		$messages = $old_data['messages'] ? $old_data['messages'] : array();
		array_push( $messages, $new_message );
		$messages = maybe_serialize( $messages );

		$where = array(
			'message_id' => $message_id,
		);

		$data = array(
			'updated_time' => $time,
			'messages'     => $messages,
		);

		return $wpdb->update( $table, $data, $where, null, '%d' );
	}

	public static function delete_message( $message_id ) {
		global $wpdb;

		$table = self::get_table( 'messages' );
		$where = array(
			'message_id' => $message_id,
		);

		return $wpdb->delete( $table, $where, '%d' );
	}

	private static function build_message( $by, $time, $args ) {
		$type = $args['message_type'];
		$msg  = $args['message_value'];

		if ( $type == 'text' ) {
			$value = $msg;
		}

		$message = array(
			'by'    => $by,
			'time'  => $time,
			'type'  => $type,
			'value' => $value,
		);

		return $message;
	}

	private static function generate_session() {
		$time   = microtime();
		$time   = str_replace( array( ' ', '.' ), '', $time );
		$chars  = substr( str_shuffle( 'abcdefghijklmnopqrstuvwxyz' ), 1, 10 );
		$random = $chars . $time;
		$random = str_shuffle( $random );
		return $random;
	}
}
