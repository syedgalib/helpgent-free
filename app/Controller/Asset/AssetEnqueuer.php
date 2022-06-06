<?php

namespace WPWaxCustomerSupportApp\Controller\Asset;

use WPWaxCustomerSupportApp\Utility\Enqueuer;

abstract class AssetEnqueuer extends Enqueuer {

	public $asset_group = 'public';

	/**
	 * Load Scripts
	 *
	 * @return void
	 */
	abstract public function load_scripts();

	public function __construct() {

		add_action( 'script_loader_tag', [ $this, 'add_script_attributes' ], 20, 3 );

	}

	/**
	 * Add Sscript Attributes
	 * 
	 * @return string
	 */
	public function add_script_attributes( $tag, $handle, $src ) {

		if ( ! WPWAX_CUSTOMER_SUPPORT_APP_IN_DEVELOPMENT ) {
			return $tag;
		}

        if ( ! preg_match( '/^(simple-todo-).+/',  $handle ) ) {
            return $tag;
        }

        $tag = str_replace( 'src=', "type='module' src=", $tag );

        return $tag;
    }

	/**
	 * Enqueue Scripts
	 *
	 * @return void
	 */
	public function enqueue_scripts( $page = '' ) {

		// Set Script Version
		$this->setup_load_min_files();

		// Set Script Version
		$this->setup_script_version();

		// Load Script
		$this->load_scripts();

		// Apply Hook to Scripts
		$this->apply_hook_to_scripts();

		// CSS
		$this->register_css_scripts();
		$this->enqueue_css_scripts_by_group( [ 'group' => $this->asset_group, 'page' => $page ] );

		// JS
		$this->register_js_scripts();
		$this->enqueue_js_scripts_by_group( [ 'group' => $this->asset_group, 'page' => $page ] );
	}

	/**
	 * Load min files
	 *
	 * @return void
	 */
	public function setup_load_min_files() {
		$this->load_min = apply_filters( 'wpwax_customer_support_app_load_min_files',  WPWAX_CUSTOMER_SUPPORT_APP_LOAD_MIN_FILES );
	}

	/**
	 * Set Script Version
	 *
	 * @return void
	 */
	public function setup_script_version() {
		$script_version = ( $this->load_min ) ? WPWAX_CUSTOMER_SUPPORT_APP_SCRIPT_VERSION : md5( time() );
		$this->script_version = apply_filters( 'wpwax_customer_support_app_script_version', $script_version );
	}

	/**
	 * Apply Hook to Scripts
	 *
	 * @return void
	 */
	public function apply_hook_to_scripts() {
		$this->css_scripts = apply_filters( 'wpwax_customer_support_app_css_scripts', $this->css_scripts );
		$this->js_scripts = apply_filters( 'wpwax_customer_support_app_js_scripts', $this->js_scripts );
	}
}