<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Scripts {

	public $version;

	public function __construct() {
		$this->version = time(); // change to VM_VERSION later

		add_action( 'wp_enqueue_scripts', [ $this, 'register_scripts' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'register_scripts' ] );

		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ], 12 );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_scripts' ], 12 );
	}

	public function register_scripts() {
		// Frontend
		wp_register_style( 'vm-style', Helper::get_css( 'style' ), [], $this->version );
		wp_register_script( 'vm-main', Helper::get_js( 'main' ), ['jquery', 'react', 'react-dom'], $this->version, true );

		// Admin
		wp_register_style( 'vm-admin-style', Helper::get_css( 'admin' ), [], $this->version );
		wp_register_script( 'vm-admin-script', Helper::get_js( 'admin' ), ['jquery', 'react', 'react-dom'], $this->version, true );
	}

	public function enqueue_scripts() {
		wp_enqueue_style( 'vm-style' );
		wp_enqueue_script( 'vm-main' );
	}

	public function enqueue_admin_scripts() {
		wp_enqueue_style( 'vm-admin-style' );
		wp_enqueue_script( 'vm-admin-script' );
	}

}