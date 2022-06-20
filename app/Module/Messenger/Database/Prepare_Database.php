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
			user_id bigint(20) unsigned NOT NULL,
			session_id varchar(255) NOT NULL,
			created_on datetime NOT NULL,
			updated_on datetime NOT NULL,
			note varchar(255) NOT NULL DEFAULT '',
			message longtext NOT NULL DEFAULT '',
			attachment_id int(20) DEFAULT NULL,
			message_type varchar(100) NOT NULL DEFAULT 'text',
			seen_by longtext,
			PRIMARY KEY (id),
			KEY user_id (user_id),
			KEY created_on (created_on),
			KEY updated_on (updated_on)
		  ) $collate;

		CREATE TABLE {$table_prefix}_message_terms (
			term_id bigint(20) unsigned NOT NULL auto_increment,
			name varchar(200) NOT NULL DEFAULT '',
			term_key varchar(200) NOT NULL DEFAULT '',
			PRIMARY KEY (term_id),
			KEY name (name),
			KEY term_key (term_key)
		  ) $collate;

		CREATE TABLE {$table_prefix}_message_term_taxonomy (
			term_taxonomy_id bigint(20) unsigned NOT NULL auto_increment,
			term_id bigint(20) unsigned NOT NULL DEFAULT 0,
			taxonomy varchar(32) NOT NULL  DEFAULT '',
			parent bigint(20) unsigned NOT NULL DEFAULT 0,
			PRIMARY KEY (term_taxonomy_id),
            KEY taxonomy (taxonomy)
		) $collate;

		CREATE TABLE {$table_prefix}_message_term_relationships (
			object_id bigint(20) unsigned NOT NULL DEFAULT 0,
			term_taxonomy_id bigint(20) unsigned NOT NULL DEFAULT 0,
			PRIMARY KEY (object_id),
            KEY term_taxonomy_id (term_taxonomy_id)
		) $collate;
		";

		return $tables;
	}

}