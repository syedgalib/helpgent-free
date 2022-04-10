<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Scripts {

	public $version;
	protected static $instance = null;

	public function __construct() {
		$this->version = time();

		add_action( 'wp_enqueue_scripts', [ $this, 'register_scripts' ], 12 );
		add_action( 'admin_enqueue_scripts', [ $this, 'register_scripts' ], 12 );

		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ], 15 );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_scripts' ], 15 );
	}

	public static function instance() {

		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	public function register_scripts() {
		wp_register_script( 'vm-main', Helper::get_js( 'main' ), ['jquery', 'react', 'react-dom'], $this->version, true );
		wp_register_script( 'vm-admin', Helper::get_js( 'admin' ), ['jquery', 'react', 'react-dom'], $this->version, true );
	}

	public function enqueue_scripts() {
		wp_enqueue_script( 'vm-main' );
	}

	public function enqueue_admin_scripts() {
		wp_enqueue_script( 'vm-admin' );
	}

}

Scripts::instance();