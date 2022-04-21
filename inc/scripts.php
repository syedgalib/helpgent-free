<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Scripts {

	public static $version;

	public static function init() {
		self::$version = time(); // change to VM_VERSION later

		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'register_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'register_scripts' ) );

		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'enqueue_scripts' ), 12 );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'enqueue_admin_scripts' ), 12 );
	}

	public static function register_scripts() {
		// Frontend
		wp_register_style( 'vm-style', Helper::get_css( 'style' ), array(), self::$version );
		wp_register_script( 'vm-main', Helper::get_js( 'main' ), array( 'jquery', 'react', 'react-dom' ), self::$version, true );

		// Admin
		wp_register_style( 'vm-admin-style', Helper::get_css( 'admin' ), array(), self::$version );
		wp_register_script( 'vm-admin-script', Helper::get_js( 'admin' ), array( 'jquery', 'react', 'react-dom' ), self::$version, true );
	}

	public static function enqueue_scripts() {
		wp_enqueue_style( 'vm-style' );
		wp_enqueue_script( 'vm-main' );
		self::localized_data();
	}

	public static function enqueue_admin_scripts() {
		wp_enqueue_style( 'vm-admin-style' );
		wp_enqueue_script( 'vm-admin-script' );
		self::localized_data();
	}

	public static function localized_data() {
		$api_data = array(
			'nonce' => wp_create_nonce( 'wp_rest' )
		);
		wp_localize_script( 'vm-main', 'vmApi', $api_data );
		wp_localize_script( 'vm-admin-script', 'vmApi', $api_data );
	}
}