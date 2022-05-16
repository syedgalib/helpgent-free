<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm\db;

trait Messages_Trait {

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
