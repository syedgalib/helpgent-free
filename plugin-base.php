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
define( 'VM_PATH_INC', VM_PATH . 'inc/' );
define( 'VM_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );

final class wpWax_Video_Messagge {

	protected static $instance = null;

	public $Factory; // object factory

	public function __construct() {
		$this->Factory = new stdClass();

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

	public function init() {
		$this->Factory->Scripts    = new \wpWax\vm\Scripts();
		$this->Factory->Admin_Menu = new \wpWax\vm\Admin_Menu();
		$this->Factory->Chatbox    = new \wpWax\vm\Chatbox();

		$this->Factory->Rest_API_Forms    = new \wpWax\vm\rest_api\Forms();
		$this->Factory->Rest_API_Messages = new \wpWax\vm\rest_api\Messages();

		if ( is_admin() ) {
			$this->Factory->Install = new \wpWax\vm\Install();
		}
	}

	public function load_textdomain() {
		load_plugin_textdomain( 'wpwaxvm', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
	}

	public function autoload( $class_name ) {
		$namespace = 'wpWax\vm\\';

		if ( strpos( $class_name, $namespace ) !== 0 ) {
			return;
		}

		$file = str_replace( $namespace, '', $class_name ); // remove namespace
		$file = str_replace( '_', '-', $file ); // convert '_' to '-'.
		$file = str_replace( '\\', '/', $file ); // convert '\' to '/'.
		$file = strtolower( $file ); // make lowercase
		$path = VM_PATH_INC . $file . '.php';

		require_once $path;
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
