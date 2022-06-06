<?php


/**
 * Get The Public Template
 * 
 * @param string $path
 * @param array $data
 * @param bool $extract
 * 
 * @return string Public Template
 */
function wpwax_customer_support_app_get_template( $path = '', $data = [], $extract = true ) {

    ob_start();

    wpwax_customer_support_app_get_the_template( $path, $data, $extract );

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
function wpwax_customer_support_app_get_the_template( $path = '', $data = [], $extract = true ) {

    $file_path = WPWAX_CUSTOMER_SUPPORT_APP_TEMPLATE_PATH . $path;

    wpwax_customer_support_app_get_the_file_content( $file_path, $data, $extract );
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
function wpwax_customer_support_app_get_view( $path = '', $data = [], $extract = true ) {

    ob_start();

    wpwax_customer_support_app_get_the_view( $path, $data, $extract );

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
function wpwax_customer_support_app_get_the_view( $path = '', $data = [], $extract = true ) {

    $file_path = WPWAX_CUSTOMER_SUPPORT_APP_VIEW_PATH . $path;

    wpwax_customer_support_app_get_the_file_content( $file_path, $data, $extract );
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
function wpwax_customer_support_app_get_the_file_content( $path = '', $data = [], $extract = true ) {

    $file = $path . '.php';

    if ( ! file_exists( $file ) ) {
        return;
    }

    if ( $extract ) {
        extract( $data );
    }
    
    include $file;
}