<?php

namespace WPWaxCustomerSupportApp\Module\Chatbox_Template\Model;

use \WP_Error;
use WPWaxCustomerSupportApp\Model\DB_Model;
use WPWaxCustomerSupportApp\Base\Helper;

class CB_Template_Model extends DB_Model {

    /**
     * Table Name
     * 
     * @var string
     */
    public static $table = 'chatbox_templates';

    /**
     * Get Items
     * 
     * @param array $args
     * @return array
     */
    public static function get_items( $args = [], $debug = false ) {
        global $wpdb;

		$template_table          = self::get_table_name( self::$table );
		$page_relationship_table = self::get_table_name( CB_Template_Page_Relationship_Model::$table );

        $default = [];

        $default['limit']    = 20;
        $default['page']     = 1;
        $default['fields']   = '*';

        $args = ( is_array( $args ) ) ? array_merge( $default, $args ) : $default;

		$limit  = $args['limit'];
		$offset = ( $limit * $args['page'] ) - $limit;

		$where = ' WHERE 1=1';

        // Construct where clause
        if ( ! empty( $args['where'] ) && is_array( $args[ 'where' ] ) ) {
            
            foreach ( $args['where'] as $key => $value ) {

                if ( is_array( $value ) ) {

                    $_key     = $value['field'];
                    $_compare = $value['compare'];
                    $_value   = $value['value'];

                    $where .= " AND {$_key} {$_compare} {$_value}";

                    continue;
                }

                $where .= " AND {$key}='{$value}'";
            }

        }

        $default_fields = [
            "$template_table.*",
            "GROUP_CONCAT(page_id) as pages",
        ];

        $fields = ( ! empty( $args['fields'] ) && is_array( $args['fields'] ) ) ? array_merge( $default_fields, $args['fields'] ) : $default_fields;
        $fields = implode( ', ', $fields );
        $fields = trim( $fields, ', ' );
        
		$select = "SELECT $fields FROM $template_table 
        LEFT JOIN $page_relationship_table ON $template_table.id = $page_relationship_table.template_id
        ";

		$query = $select . $where . " GROUP BY id LIMIT $limit OFFSET $offset";

		return $wpdb->get_results( $query, ARRAY_A );

    }

    /**
     * Get Item
     * 
     * @param int $id
     * @return array|WP_Error
     */
    public static function get_item( $id ) {
        global $wpdb;

        if ( empty( $id ) ) {
            return false;
        }

        $template_table          = self::get_table_name( self::$table );
		$page_relationship_table = self::get_table_name( CB_Template_Page_Relationship_Model::$table );

        $fields = "$template_table.*, GROUP_CONCAT(page_id) as pages";
        $select = "SELECT $fields FROM $template_table 
        LEFT JOIN $page_relationship_table ON $template_table.id = $page_relationship_table.template_id
        ";

		$query  = $wpdb->prepare( "$select WHERE id = %d GROUP BY id", array( $id ) );
		$result = $wpdb->get_row( $query, ARRAY_A );

        if ( empty( $result ) ) {
            $message = __( 'Could not find the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		return $result;
    }

    /**
     * Create Item
     * 
     * @param array $args
     * @return int|WP_Error
     */
    public static function create_item( $args = [] ) {
        global $wpdb;

		$table = self::get_table_name( self::$table );

        $default = [];

        $default['name']       = '';
        $default['page_ids']   = '';
        $default['is_default'] = 0;
        $default['options']    = '';

        if ( ! empty( $args['name'] ) ) {
            $args['name'] = sanitize_text_field( $args['name'] );
        }

        if ( isset( $args['options'] ) && ! json_decode( $args['options'] ) ) {
            $message = __( 'Options is not valid JSON data.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( isset( $args['is_default'] ) ) {
            $args['is_default'] = Helper\is_truthy( $args['is_default'] ) ? 1 : 0;
        }

        $args = Helper\merge_params( $default, $args );

        $page_ids = [];

        if ( isset( $args['page_ids'] ) ) {
            $page_ids = Helper\convert_string_to_int_array( $args['page_ids'] );
            unset( $args['page_ids'] );
        }
        
        if ( self::name_exists( $args['name'] ) ) {
            $message = __( 'The template name already exists.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$result = $wpdb->insert( $table, $args );

        if ( empty( $result ) ) {
            $message = __( 'Could not create the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        $template_id = $wpdb->insert_id;

        // Assign Page IDs
        if ( ! empty( $page_ids ) ) {

            foreach( $page_ids as $page_id ) {
                CB_Template_Page_Relationship_Model::create_item([
                    'template_id' => $template_id,
                    'page_id'     => $page_id,
                ]);
            }
            
        }

		return  self::get_item( $template_id );
    }

    /**
     * Update Item
     * 
     * @param array $args
     * @return array|WP_Error
     */
    public static function update_item( $args = [] ) {
        global $wpdb;
        
        if ( empty( $args['id'] ) ) {
            $message = __( 'Resource ID is required.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

		$table    = self::get_table_name( self::$table );
		$old_data = self::get_item( $args['id'] );

        if ( empty( $old_data ) ) {
            $message = __( 'Could not find the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( ! empty( $args['name'] ) ) {
            $args['name'] = sanitize_text_field( $args['name'] );
        }

        if ( ! empty( $args['name'] ) && strtolower( $args['name'] ) !== strtolower( $old_data['name'] ) && self::name_exists( $args['name'] ) ) {
            $message = __( 'The template name already exists.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( isset( $args['options'] ) && ! json_decode( $args['options'] ) ) {
            $message = __( 'Options is not valid JSON data.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        if ( isset( $args['is_default'] ) ) {
            $args['is_default'] = Helper\is_truthy( $args['is_default'] ) ? 1 : 0;
        }

        $page_ids = [];

        if ( isset( $args['page_ids'] ) ) {
            $page_ids = Helper\convert_string_to_int_array( $args['page_ids'] );
        }

        // Assign Page IDs
        if ( ! empty( $page_ids ) ) {
            // Delete old page IDs before new assignment
            CB_Template_Page_Relationship_Model::delete_item_where([
                'template_id' => $args['id']
            ]);

            foreach( $page_ids as $page_id ) {
                CB_Template_Page_Relationship_Model::create_item([
                    'template_id' => $args['id'],
                    'page_id'     => $page_id,
                ]);
            }
            
        }

        // Delete page IDs if empty
        if ( isset( $args['page_ids'] ) && ! count( $page_ids ) ) {
            CB_Template_Page_Relationship_Model::delete_item_where([
                'template_id' => $args['id']
            ]);
        }

        $args = Helper\filter_params( $old_data, $args );

        if ( Helper\list_has_same_data( $old_data, $args ) ) {
            return self::get_item( $args['id'] );
        }

        $where = ['id' => $args['id'] ];
		$result = $wpdb->update( $table, $args, $where, null, '%d' );

        if ( empty( $result ) ) {
            $message = __( 'Could not update the resource.', 'wpwax-customer-support-app' );
            return new WP_Error( 403, $message );
        }

        return self::get_item( $args['id'] );
    }

    /**
     * Delete Item
     * 
     * @param array $args
     * @return bool
     */
    public static function delete_item( $id ) {
        global $wpdb;

        if ( empty( $id ) ) {
            return false;
        }

		$table = self::get_table_name( self::$table );
		$where = ['id' => $id ];

		$success = $wpdb->delete( $table, $where, '%d' );

        if ( ! empty( $success ) ) {
            // Delete page IDs
            CB_Template_Page_Relationship_Model::delete_item_where([
                'template_id' => $id
            ]);
        }

        return ( ! empty( $success ) ) ? true : false;
    }

    /**
     * Delete Item Where
     * 
     * @param array $args
     * @return bool
     */
    public static function delete_item_where( $where = [] ) {
        global $wpdb;

		$table = self::get_table_name( self::$table );
		$status = $wpdb->delete( $table, $where, '%d' );

        return ( ! empty( $status ) ) ? true : false;
    }

    /**
     * Name Exists
     * 
     * @param string $template_name
     * 
     * @return bool
     */
    public static function name_exists( $template_name ) {
        global $wpdb;

        $template_name = strtolower( sanitize_text_field( $template_name ) );

        $table = self::get_table_name( self::$table );
        $sql   = "SELECT LOWER(name) FROM {$table} WHERE name = '{$template_name}'";

        $query   = $wpdb->prepare( $sql );
        $results = $wpdb->get_row( $query, ARRAY_A );

        return ! empty( $results ) ? true : false;
    }
}

