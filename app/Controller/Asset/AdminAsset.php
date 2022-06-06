<?php

namespace WPWaxCustomerSupportApp\Controller\Asset;

class AdminAsset extends AssetEnqueuer {
	
	/**
	 * Constuctor
	 * 
	 */
	function __construct() {
		$this->asset_group = 'admin';
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

    /**
	 * Load Admin CSS Scripts
	 *
	 * @return void
	 */
	public function load_scripts() {
        $this->add_css_scripts();
        $this->add_js_scripts();
    }

	/**
	 * Load Admin CSS Scripts
	 *
	 * @return void
	 */
	public function add_css_scripts() {
		$scripts = [];

		// $scripts['simple-todo-admin-main-style'] = [
		// 	'file_name' => 'admin-main',
		// 	'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_CSS_PATH,
		// 	'deps'      => [],
		// 	'ver'       => $this->script_version,
		// 	'group'     => 'admin',
		// ];

		$scripts['simple-todo-admin-style'] = [
			'file_name' => 'admin',
			'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_CSS_PATH,
			'deps'      => [],
			'ver'       => $this->script_version,
			'group'     => 'admin',
		];

		$scripts = array_merge( $this->css_scripts, $scripts);
		$this->css_scripts = $scripts;
	}

	/**
	 * Load Admin JS Scripts
	 *
	 * @return void
	 */
	public function add_js_scripts() {
		$scripts = [];

		// $scripts['simple-todo-admin-main-script'] = [
		// 	'file_name'     => 'admin-main',
		// 	'base_path'     => WPWAX_CUSTOMER_SUPPORT_APP_JS_PATH,
		// 	'deps'          => '',
		// 	'ver'           => $this->script_version,
		// 	'group'         => 'admin',
		// ];

		$scripts['simple-todo-react-refresh'] = [
			'file_name' => 'react-refresh',
			'src_path'  => WPWAX_CUSTOMER_SUPPORT_APP_VENDOR_JS_SRC_PATH,
			'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_VENDOR_JS_PATH,
			'deps'      => [],
			'ver'       => null,
			'group'     => 'global',
			'enable'    => WPWAX_CUSTOMER_SUPPORT_APP_IN_DEVELOPMENT,
			'data'      => [
				'vmViteData' => [
					'host'           => WPWAX_CUSTOMER_SUPPORT_APP_VITE_HOST,
					'base'           => WPWAX_CUSTOMER_SUPPORT_APP_VITE_HOST_BASE,
					'in_development' => WPWAX_CUSTOMER_SUPPORT_APP_IN_DEVELOPMENT,
				]
			],
		];

		$scripts['simple-todo-admin-script'] = [
			'file_name' => 'admin',
			'src_path'  => WPWAX_CUSTOMER_SUPPORT_APP_SRC_PATH . 'js/admin/',
			'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_JS_PATH,
			'deps'      => '',
			'ver'       => $this->script_version,
			'group'     => 'admin',
			'data'      => [
				'vmViteData' => [
					'apiEndpoint' => site_url() . '/wp-json/wpwax-vm/v1',
					'apiNonce'    => wp_create_nonce( 'wp_rest' ),
				]
			],
		];

		$scripts = array_merge( $this->js_scripts, $scripts);
		$this->js_scripts = $scripts;
	}
}