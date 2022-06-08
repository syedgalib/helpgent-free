<?php

/**
 * @author  wpWax
 */

namespace WPWaxCustomerSupportApp\Model\DB;

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

		if ( $table == 'relationship' ) {
			return $wpdb->prefix . 'vm_relationship';
		}
	}

}
