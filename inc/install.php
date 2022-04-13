<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Database {

	public $tbl_;

	public function __construct() {

	}

	public function create_table() {
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		global $wpdb;
		$tablename = 'wpdocs_myTable';
		$main_sql_create = 'CREATE TABLE ' . $tablename . ';';
		maybe_create_table( $wpdb->prefix . $tablename, $main_sql_create );
	}

}