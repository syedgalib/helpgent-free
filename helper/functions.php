<?php

namespace WPWaxCustomerSupportApp\Root\Helper;

/**
 * Get The Public Template
 * 
 * @param string $path
 * @param array $data
 * @param bool $extract
 * 
 * @return string Public Template
 */
function get_template( $path = '', $data = [], $extract = true ) {

    ob_start();

    get_the_template( $path, $data, $extract );

    return ob_get_clean();
}

/**
 * Prints The Public Template
 * 
 * @param string $path
 * @param array $data
 * @param bool $extract
 * 
 * @return void Prints Public Template
 */
function get_the_template( $path = '', $data = [], $extract = true ) {

    $file_path = WPWAX_CUSTOMER_SUPPORT_APP_TEMPLATE_PATH . $path;

    get_the_file_content( $file_path, $data, $extract );
}


/**
 * Get The Admin Template
 * 
 * @param string $path
 * @param array $data
 * @param bool $extract
 * 
 * @return string Admin Template
 */
function get_view( $path = '', $data = [], $extract = true ) {

    ob_start();

    get_the_view( $path, $data, $extract );

    return ob_get_clean();
}

/**
 * Prints The Admin Template
 * 
 * @param string $path
 * @param array $data
 * @param bool $extract
 * 
 * @return void Prints Admin Template
 */
function get_the_view( $path = '', $data = [], $extract = true ) {

    $file_path = WPWAX_CUSTOMER_SUPPORT_APP_VIEW_PATH . $path;

    get_the_file_content( $file_path, $data, $extract );
}

/**
 * Prints The File Content
 * 
 * @param string $path
 * @param array $data
 * @param bool $extract
 * 
 * @return void Prints the file contents
 */
function get_the_file_content( $path = '', $data = [], $extract = true ) {

    $file = $path . '.php';

    if ( ! file_exists( $file ) ) {
        return;
    }

    if ( $extract ) {
        extract( $data );
    }
    
    include $file;
}

/**
 * Handle Upload
 * 
 * @return mixed
 */
function handle_media_upload( $file, $overrides = array( 'test_form' => false ) ) {
    include_media_uploader_files();

    $time = current_time( 'mysql' );
    $file = wp_handle_upload( $file, $overrides, $time );

    return $file;
}


/**
 * Filter Params
 * 
 * @param array $default
 * @param array $args
 * 
 * @return array Merged Params
 */
function filter_params( $default = [], $args = [] ) {

    $filtered_params = [];

    foreach( $default as $key => $value ) {

        if ( ! isset( $args[ $key ] ) ) {
            continue;
        }

        $filtered_params[ $key ] = $args[ $key ];
    }

    return $filtered_params;

}

/**
 * List has same data
 * 
 * @param array $list_a
 * @param array $list_b
 * 
 * @return bool
 */
function list_has_same_data( $list_a = [], $list_b = [] ) {

    if ( ! is_array( $list_a ) || ! is_array( $list_b ) ) {
        return false;
    }

    if ( count( $list_a ) < count( $list_b ) ) {
        $smaller_list = $list_a;
        $larger_list  = $list_b;
    } else {
        $smaller_list = $list_b;
        $larger_list  = $list_a;
    }

    foreach( $smaller_list as $key => $value ) {

        if ( ! isset( $larger_list[ $key ] ) ) {
            continue;
        }

        if ( (string) $value !== (string) $larger_list[ $key ] ) {
            return false;
        }
    }

    return true;

}

/**
 * Merge Params
 * 
 * @param array $default
 * @param array $args
 * 
 * @return array Merged Params
 */
function merge_params( $default = [], $args = [] ) {

    foreach( $default as $key => $value ) {

        if ( ! isset( $args[ $key ] ) ) {
            continue;
        }

        $default[ $key ] = $args[ $key ];
    }

    return $default;

}

/**
 * Swap array keys
 * 
 * @param array $list
 * @param array $swap_map
 * 
 * @return array Swaped Array
 */
function swap_array_keys( $list = [], $swap_map = [] ) {

    if ( ! is_array( $list ) && ! is_array( $swap_map ) ) {
        return $list;
    }

    foreach( $list as $key => $value ) {
            
        if ( empty( $swap_map[ $key ] ) ) {
            continue;
        }

        unset( $list[ $key ] );

        $swap_key = $swap_map[ $key ];
        $list[ $swap_key ] = $value;
    }

    return $list;

}

/**
 * Convert string to int array
 * 
 * @param string $string
 * @param string $separator ,
 * @param string $remove_non_int_items true
 * 
 * @return array
 */
function convert_string_to_int_array( $string, $separator = ',', $remove_non_int_items = true ) {
    $list = convert_string_to_array( $string, $separator );
    $list = parse_array_items_to_int( $list, $remove_non_int_items );

    return $list;
}

/**
 * Convert string to array
 * 
 * @param string $string
 * @param string $separator ,
 * 
 * @return array
 */
function convert_string_to_array( $string, $separator = ',' ) {

    $string = trim( $string, ',\s' );
    $list   = explode( $separator, $string );
        
    if ( ! is_array( $list ) ) {
        return [];
    }

    return $list;
}

/**
 * Parse array items to int
 * 
 * @param array $list
 * 
 * @return array
 */
function parse_array_items_to_int( $list = [], $remove_non_int_items = true ) {

    if ( ! is_array( $list ) ) {
        return $list;
    }

    foreach( $list as $key => $value ) {

        $list[ $key ] = 0;

        if ( is_numeric( $value ) ) {
            $list[ $key ] = (int) $value;
        }

        if ( ! is_numeric( $value ) && $remove_non_int_items ) {
            unset( $list[ $key ] );
        }

    }

    return array_values( $list );
}

/**
 * Generate Slug
 * 
 * @param string $string
 * 
 * @return string Slug
 */
function generate_slug( $string ) {

    $slug = trim( $string );
    $slug = sanitize_key( $slug );
    $slug = strtolower( $string );
    $slug = preg_replace( '/\s{2,}/', ' ', $slug );
    $slug = preg_replace( '/\s/', '-', $slug ); 

    return $slug;

}

/**
 * Delete File by URL
 * 
 * @param string $file_url
 * @return bool
 */
function delete_file_by_url( $file_url ) {
    $regex = '/wp-content.+/';

    $match = [];
    preg_match( $regex, $file_url, $match );

    $file_path = ( ! empty( $match ) ) ? $match[0] : '';

    $upload_dir = wp_upload_dir();
    $file_src   = preg_replace( $regex, $file_path, $upload_dir['basedir'] );

    if ( file_exists( $file_src ) ) {
        wp_delete_file( $file_src );

        return true;
    }

    return false;
}

/**
 * Include Media Uploader Files
 * 
 * @return void
 */
function include_media_uploader_files() {

    require_once( ABSPATH . "wp-admin" . '/includes/image.php' );
    require_once( ABSPATH . "wp-admin" . '/includes/file.php' );
    require_once( ABSPATH . "wp-admin" . '/includes/media.php' );
    
}