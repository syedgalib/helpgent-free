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
		CREATE TABLE {$table_prefix}_attachments (
			id bigint(20) unsigned NOT NULL auto_increment,
			created_on datetime NOT NULL,
			updated_on datetime NOT NULL,
			title varchar(255) NOT NULL DEFAULT '',
			link varchar(255) NOT NULL DEFAULT '',
			media_type varchar(100) NOT NULL DEFAULT '',
			expires_on datetime DEFAULT NULL,
			PRIMARY KEY (id),
            KEY link (link)
		) $collate;
		";

		return $tables;
	}

}