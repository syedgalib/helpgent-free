<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Database;

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
		CREATE TABLE {$table_prefix}_messages (
			id bigint(20) unsigned NOT NULL auto_increment,
			conversation_id bigint(20) unsigned NOT NULL,
			user_email varchar(255) NOT NULL,
			message longtext NOT NULL DEFAULT '',
			message_type varchar(100) NOT NULL DEFAULT 'text',
			attachment_id int(20) DEFAULT NULL,
			parent bigint(20) unsigned NOT NULL,
			parent_type varchar(255) NOT NULL,
			created_at datetime NOT NULL,
			updated_at datetime NOT NULL,

			PRIMARY KEY (id),
			KEY user_email (user_email),
			KEY created_at (created_at),
			KEY updated_at (updated_at)
		) $collate;

		CREATE TABLE {$table_prefix}_message_meta (
			meta_id bigint(20) unsigned NOT NULL auto_increment,
			message_id bigint(20) unsigned NOT NULL,
			meta_key varchar(255) NOT NULL,
			meta_value longtext NULL,

			PRIMARY KEY (meta_id),
			KEY message_id (message_id),
			KEY meta_key (meta_key)
		) $collate;

		CREATE TABLE {$table_prefix}_conversations (
			id bigint(20) unsigned NOT NULL auto_increment,
			title varchar(255) NOT NULL DEFAULT '',
			created_by varchar(255) NOT NULL DEFAULT '',
			status varchar(255) NOT NULL DEFAULT 'publish',
			created_at datetime NOT NULL,
			updated_at datetime NOT NULL,

			PRIMARY KEY (id),
			KEY status (status)
		) $collate;

		CREATE TABLE {$table_prefix}_conversation_meta (
			meta_id bigint(20) unsigned NOT NULL auto_increment,
			conversation_id bigint(20) unsigned NOT NULL,
			meta_key varchar(255) NOT NULL,
			meta_value longtext NULL,

			PRIMARY KEY (meta_id),
			KEY conversation_id (conversation_id),
			KEY meta_key (meta_key)
		) $collate;

		CREATE TABLE {$table_prefix}_conversation_term_relationships (
			conversation_id bigint(20) unsigned NOT NULL,
			term_taxonomy_id bigint(20) unsigned NOT NULL,
			term_order int(11) unsigned NOT NULL DEFAULT 0,

			PRIMARY KEY (conversation_id, term_taxonomy_id),
			KEY term_taxonomy_id (term_taxonomy_id)
		) $collate;
		";

		return $tables;
	}

}