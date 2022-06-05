<?php
/**
 * @author  wpWax
 */

namespace wpWax\vm;

class Scripts {

	public $version;

	public function __construct() {
		$this->version = ( VM_IN_DEVELOPMENT ) ? null : time(); // change to VM_VERSION later
		// $this->version = null; // change to VM_VERSION later

		add_action( 'wp_enqueue_scripts', array( $this, 'register_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'register_scripts' ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ), 12 );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_scripts' ), 12 );

		add_action( 'script_loader_tag', [ $this, 'add_vite_script_attributes' ], 20, 3 );
	}

	public function register_scripts() {
		// Global
		wp_register_script( 'vm-react-refresh', Helper::get_vendor_assets( 'js/react-refresh.js' ), array(), $this->version );

		// Frontend
		wp_register_style( 'vm-public-style', Helper::get_css( 'public' ), array(), $this->version );
		wp_register_script( 'vm-public-script', Helper::get_js( 'public' ), array( 'jquery' ), $this->version, true );

		// Admin
		wp_register_style( 'vm-admin-style', Helper::get_css( 'admin' ), array(), $this->version );
		wp_register_script( 'vm-admin-script', Helper::get_js( 'admin' ), array( 'jquery' ), $this->version, true );
	}

	public function enqueue_scripts() {
		$this->enqueue_public_css_scripts();
		$this->enqueue_public_js_scripts();
	}

	public function enqueue_public_css_scripts() {

		if ( VM_IN_DEVELOPMENT ) {
			return;
		}

		wp_enqueue_style( 'vm-public-style' );
	}

	public function enqueue_public_js_scripts() {

		if ( VM_IN_DEVELOPMENT ) {
			wp_enqueue_script( 'vm-react-refresh' );
		}

		wp_enqueue_script( 'vm-public-script' );

		$this->localized_data();
	}

	public function enqueue_admin_scripts() {
		$this->enqueue_admin_css_scripts();
		$this->enqueue_admin_js_scripts();
	}

	public function enqueue_admin_css_scripts() {

		if ( VM_IN_DEVELOPMENT ) {
			return;
		}

		wp_enqueue_style( 'vm-admin-style' );
	}

	public function enqueue_admin_js_scripts() {

		if ( VM_IN_DEVELOPMENT ) {
			wp_enqueue_script( 'vm-react-refresh' );
		}

		wp_enqueue_script( 'vm-admin-script' );

		$this->localized_data();
	}

	public function localized_data() {
		$api_data = array(
			'apiEndpoint' => site_url() . '/wp-json/wpwax-vm/v1',
			'apiNonce'    => wp_create_nonce( 'wp_rest' ),
		);
		wp_localize_script( 'vm-public-script', 'vmData', $api_data );
		wp_localize_script( 'vm-admin-script', 'vmData', $api_data );
	}

	public function add_vite_script_attributes( $tag, $handle, $src ) {

		// if ( ! VM_IN_DEVELOPMENT ) {
		// 	return $tag;
		// }

        if ( ! preg_match( '/^(vm-).+/',  $handle ) ) {
            return $tag;
        }

        $tag = str_replace( 'src=', "type='module' src=", $tag );

        return $tag;
    }
}
