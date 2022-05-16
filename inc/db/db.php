<?php
/**
 * Handles database queries.
 *
 * Must pass sanitized values as argument.
 *
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm\db;

class DB {
	use Forms_Trait;
	use Messages_Trait;

	public static function get_table( $table ) {
		global $wpdb;

		if ( $table == 'forms' ) {
			return $wpdb->prefix . 'vm_forms';
		}

		if ( $table == 'messages' ) {
			return $wpdb->prefix . 'vm_messages';
		}
	}

}
