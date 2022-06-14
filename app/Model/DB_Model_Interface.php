<?php

namespace WPWaxCustomerSupportApp\Model;

interface DB_Model_Interface {

    /**
     * Get Items
     * 
     * @param array $args
     * @return array|null
     */
    public static function get_items( $args = [] );

    /**
     * Get Item
     * 
     * @param int $id
     * @return array|null
     */
    public static function get_item( $id );

    /**
     * Create Item
     * 
     * @param array $args
     * @return int|null
     */
    public static function create_item( $args = [] );

    /**
     * Update Item
     * 
     * @param array $args
     * @return array|null
     */
    public static function update_item( $args = [] );

    /**
     * Delete Item
     * 
     * @param array $args
     * @return bool
     */
    public static function delete_item( $id );

}

