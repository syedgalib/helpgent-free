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

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'VM_VERSION', 1.0 );
define( 'VM_PLUGIN_FILE', __FILE__ );
define( 'VM_PATH', trailingslashit( plugin_dir_path( __FILE__ ) ) );
define( 'VM_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );

final class wpWax_Video_Messagge {

	protected static $instance = null;

	public $loader = array();

	public function __construct() {
		spl_autoload_register( array( $this, 'autoload' ) );

		add_action( 'init', array( $this, 'load_textdomain' ) );
		$this->init();
	}

	public static function instance() {
		if ( null == self::$instance ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	public function load_textdomain() {
		load_plugin_textdomain( 'wpwaxvm', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}

	public function autoload( $class_name ) {
		$namespace = 'wpWax\vm';
		$dir = 'includes';

		if ( ! str_starts_with( $class_name, $namespace ) ) {
			return;
		}

		$file = str_replace( $namespace, '', $class_name ); // remove namespace
		$file = str_replace( '_', '-', $file ); // convert '_' to '-'.
		$file = str_replace( '\\', '/', $file ); // convert '\' to '/'.
		$file = strtolower( $file ); // make lowercase
		$path = VM_PATH . $dir . $file. '.php';

		require_once $path;
	}

	public function init() {
		\wpWax\vm\Install::init();
		\wpWax\vm\Rest_API::init();
		\wpWax\vm\Scripts::init();
		\wpWax\vm\Admin_Menu::init();
		\wpWax\vm\Chatbox::init();
	}

	public function temp() {
		add_action(
			'wp_body_open',
			function() {
				echo '<div id="root"></div>';
			}
		);
	}

}

wpWax_Video_Messagge::instance();
