<?php

namespace WPWaxCustomerSupportApp\Model;

abstract class Base_Model implements Base_Model_Interface {

    /**
     * Table Name
     * 
     * @var string
     */
    public static $table = '';

    /**
     * Get Table Name
     * 
     * @return String Table Name
     */
    public static function get_table_name( $table = '' ) {
        global $wpdb;

        return $wpdb->prefix . WPWAX_CUSTOMER_SUPPORT_APP_DB_TABLE_PREFIX . '_' . $table;
    }

}