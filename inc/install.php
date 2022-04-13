<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Install {

	public function __construct() {

	}

	public function create_tables() {

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

	}

	public function schema() {
		global $wpdb;

		$collate = $wpdb->has_cap( 'collation' ) ? $wpdb->get_charset_collate() : '';
		$max_index_length = 191;
// https://www.tutorialspoint.com/mysql/mysql-data-types.htm
		$tables = "
		CREATE TABLE {$wpdb->prefix}vm_messages (
			id bigint(20) unsigned NOT NULL auto_increment,
			session varchar(255) NOT NULL,
			start_time datetime NOT NULL,
			updated_time datetime NOT NULL,
			name varchar(250) NOT NULL,
			email varchar(100) NOT NULL,
			messages longtext NOT NULL,
			is_read bigint(20) NOT NULL default '0'
		  ) $collate;
		";

		return $tables;
	}

}