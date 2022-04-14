<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Install {

	public static function init() {
		register_activation_hook( VM_PLUGIN_FILE, array( __CLASS__, 'activate' ) );
	}

	public static function activate() {
		self::create_tables();
	}

	private static function create_tables() {
		require_once ABSPATH . 'wp-admin/includes/upgrade.php';
		dbDelta( self::get_schema() );
	}

	private static function get_schema() {
		global $wpdb;

		$collate = $wpdb->has_cap( 'collation' ) ? $wpdb->get_charset_collate() : '';
		$max_index_length = 191;

		$tables = "
		CREATE TABLE {$wpdb->prefix}vm_messages (
			message_id bigint(20) unsigned NOT NULL auto_increment,
			session varchar(255) NOT NULL,
			start_time datetime NOT NULL,
			updated_time datetime NOT NULL,
			name varchar(250) NOT NULL,
			email varchar(100) NOT NULL,
			messages longtext,
			is_read tinyint(1) unsigned NOT NULL default '0',
			PRIMARY KEY  (message_id),
			KEY updated_time (updated_time),
			KEY email (email),
			KEY is_read (is_read)
		  ) $collate;

		CREATE TABLE {$wpdb->prefix}vm_forms (
			form_id bigint(20) unsigned NOT NULL auto_increment,
			name varchar(250) NOT NULL,
			options longtext,
			PRIMARY KEY  (form_id)
		) $collate;

		CREATE TABLE {$wpdb->prefix}vm_tags (
			tag_id bigint(20) unsigned NOT NULL auto_increment,
			name varchar(250) NOT NULL,
			PRIMARY KEY  (tag_id)
		) $collate;

		CREATE TABLE {$wpdb->prefix}vm_relationship (
			relationship_id bigint(20) unsigned NOT NULL auto_increment,
			message_id bigint(20) unsigned NOT NULL,
			type varchar(200) NOT NULL,
			value bigint(20) unsigned NOT NULL,
			PRIMARY KEY  (relationship_id),
			KEY message_id (message_id),
			KEY type (type($max_index_length)),
			KEY value (value)
		) $collate;

		CREATE TABLE {$wpdb->prefix}vm_attachments (
			attachment_id bigint(20) unsigned NOT NULL auto_increment,
			message_id bigint(20) unsigned NOT NULL,
			message_ref bigint(20) NOT NULL,
			data longtext NOT NULL,
			PRIMARY KEY (attachment_id),
			KEY message_id (message_id)
		) $collate;
		";

		return $tables;
	}
}