<?php
/**
 * Plugin Name: Video Message
 * Plugin URI: https://wpwax.com
 * Description: Video Message
 * Version: 1.0
 * Author: wpWax
 * Author URI: https://wpwax.com
 * Text Domain: wpwaxvm
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'VM_VERSION', 1.0 );
define( 'VM_PATH',    plugin_dir_path( __FILE__ ) );
define( 'VM_URL',     plugin_dir_url( __FILE__ ) );

final class wpWax_Video_Messagge {

	public function __construct() {
		add_action( 'init', [ $this, 'load_textdomain' ] );
		add_action( 'plugins_loaded', [ $this, 'includes' ] );
		// add_action('wp_body_open', function() {
		// 	echo '<div id="root"></div>';
		// });
	}

    public function load_textdomain() {
        load_plugin_textdomain( 'wpwaxvm', false, dirname( plugin_basename(__FILE__) ) . '/languages/' );
    }

	public function includes() {
		require_once VM_PATH . 'inc/init.php';
		require_once VM_PATH . 'inc/helper.php';
		require_once VM_PATH . 'inc/scripts.php';
	}
}

new wpWax_Video_Messagge();