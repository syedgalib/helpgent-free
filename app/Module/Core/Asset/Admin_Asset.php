<?php

namespace WPWaxCustomerSupportApp\Module\Core\Asset;

use WPWaxCustomerSupportApp\Utility\Enqueuer\Enqueuer;

class Admin_Asset extends Enqueuer {

    /**
     * Constuctor
     *
     */
    function __construct() {
        $this->asset_group = 'admin';
        add_action( 'admin_enqueue_scripts', [$this, 'enqueue_scripts'] );
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

        // $scripts['wpwax-customer-support-app-admin-main-style'] = [
        //     'file_name' => 'admin-main',
        //     'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_CSS_PATH,
        //     'deps'      => [],
        //     'ver'       => $this->script_version,
        //     'group'     => 'admin',
        // ];

        $scripts['wpwax-customer-support-app-core-admin-style'] = [
            'file_name' => 'core-admin',
            'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_CSS_PATH,
            'deps'      => [],
            'ver'       => $this->script_version,
            'group'     => 'admin',
        ];

        $scripts           = array_merge( $this->css_scripts, $scripts );
        $this->css_scripts = $scripts;
    }

    /**
     * Load Admin JS Scripts
     *
     * @return void
     */
    public function add_js_scripts() {
        $scripts = [];

        // $scripts['wpwax-customer-support-app-admin-main-script'] = [
        //     'file_name'     => 'admin-main',
        //     'base_path'     => WPWAX_CUSTOMER_SUPPORT_APP_JS_PATH,
        //     'deps'          => '',
        //     'ver'           => $this->script_version,
        //     'group'         => 'admin',
        // ];

        $scripts['wpwax-customer-support-app-react-refresh'] = [
            'file_name' => 'react-refresh',
            'src_path'  => WPWAX_CUSTOMER_SUPPORT_APP_VENDOR_JS_SRC_PATH,
            'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_VENDOR_JS_PATH,
            'deps'      => [],
            'ver'       => null,
            'group'     => 'global',
            'enable'    => WPWAX_CUSTOMER_SUPPORT_APP_IN_DEVELOPMENT,
        ];

        $scripts['wpwax-customer-support-app-core-admin-script'] = [
            'file_name' => 'core-admin',
            'src_path'  => WPWAX_CUSTOMER_SUPPORT_APP_ASSET_SRC_PATH . 'modules/core/js/admin/',
            'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_JS_PATH,
            'group'     => 'admin',
            'data'      => [
                'wpWaxCustomerSupportApp_CoreScriptData' => [
                    'apiEndpoint' => rest_url( 'wpwax_cs/v1' ),
                    'apiNonce'    => wp_create_nonce( 'wp_rest' ),
                ],
            ],
        ];

        $scripts          = array_merge( $this->js_scripts, $scripts );
        $this->js_scripts = $scripts;
    }
}