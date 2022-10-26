<?php

namespace WPWaxCustomerSupportApp\Module\Forms\Database;

class Prepare_Database {

    /**
     * Constructor
     *
     * @return void
     */
    public function __construct() {

        $this->create_tables();

    }

	/**
     * Create Tables
     *
     * @return void
     */
    private function create_tables() {

		require_once ABSPATH . 'wp-admin/includes/upgrade.php';

		dbDelta( $this->get_schema() );

	}

    /**
     * Get Schema
	 *
	 * @return string
     */
	private function get_schema() {
		global $wpdb;

        $table_prefix = $wpdb->prefix . WPWAX_CUSTOMER_SUPPORT_APP_DB_TABLE_PREFIX;
        $collate      = $wpdb->has_cap( 'collation' ) ? $wpdb->get_charset_collate() : '';

		$tables = "
		CREATE TABLE {$table_prefix}_chatbox_templates (
			id bigint(20) unsigned NOT NULL auto_increment,
			name varchar(255) NOT NULL DEFAULT '',
			is_default tinyint unsigned NOT NULL DEFAULT 0,
			options longtext NOT NULL,
			PRIMARY KEY (id)
		  ) $collate;

		CREATE TABLE {$table_prefix}_chatbox_template_page_relationships (
			template_id bigint(20) unsigned NOT NULL,
			page_id bigint(20) unsigned NOT NULL,
			PRIMARY KEY (template_id, page_id),
			KEY page_id (page_id)
		  ) $collate;
		";

		return $tables;
	}

}