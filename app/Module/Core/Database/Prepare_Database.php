<?php

namespace WPWaxCustomerSupportApp\Module\Core\Database;

class Prepare_Database {

    /**
     * Constructor
     *
     * @return void
     */
    public function __construct() {

        $this->create_tables();

    }

    private function create_tables() {

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		dbDelta( $this->get_schema() );

	}

    /**
     * Get Schema
     */
	private function get_schema() {
		global $wpdb;

        $table_prefix = $wpdb->prefix . WPWAX_CUSTOMER_SUPPORT_APP_DB_TABLE_PREFIX;
        $collate      = $wpdb->has_cap( 'collation' ) ? $wpdb->get_charset_collate() : '';

		$tables = "
		CREATE TABLE {$table_prefix}_auth_tokens (
			email varchar(255) NOT NULL,
			token varchar(255) NOT NULL,
			expires_at datetime NULL,

			PRIMARY KEY (email,token),
            KEY token (token)
		) $collate;

		CREATE TABLE {$table_prefix}_guest_users (
			id bigint(20) unsigned NOT NULL auto_increment,
			email varchar(255) NOT NULL,
			name varchar(255) NOT NULL,
			created_at datetime NOT NULL,

			PRIMARY KEY (id),
            KEY email (email)
		) $collate;

		CREATE TABLE {$table_prefix}_guest_user_meta (
			meta_id bigint(20) unsigned NOT NULL auto_increment,
			user_id bigint(20) unsigned NOT NULL,
			meta_key varchar(255) NOT NULL,
			meta_value longtext NOT NULL DEFAULT '',

			PRIMARY KEY (meta_id),
			KEY user_id (user_id),
			KEY meta_key (meta_key)
		) $collate;

		CREATE TABLE {$table_prefix}_attachments (
			id bigint(20) unsigned NOT NULL auto_increment,
			created_at datetime NOT NULL,
			url varchar(255) NOT NULL DEFAULT '',
			media_type varchar(100) NOT NULL DEFAULT '',
			PRIMARY KEY (id),
            KEY url (url)
		) $collate;

		CREATE TABLE {$table_prefix}_terms (
			term_id bigint(20) unsigned NOT NULL auto_increment,
			name varchar(200) NOT NULL DEFAULT '',
			term_key varchar(200) NOT NULL DEFAULT '',
			PRIMARY KEY (term_id),
			KEY name (name),
			KEY term_key (term_key)
		) $collate;

		CREATE TABLE {$table_prefix}_term_taxonomy (
			term_taxonomy_id bigint(20) unsigned NOT NULL auto_increment,
			term_id bigint(20) unsigned NOT NULL DEFAULT 0,
			taxonomy varchar(32) NOT NULL  DEFAULT '',
			parent bigint(20) unsigned NOT NULL DEFAULT 0,
			PRIMARY KEY (term_taxonomy_id),
            KEY taxonomy (taxonomy)
		) $collate;
		";

		return $tables;
	}

}