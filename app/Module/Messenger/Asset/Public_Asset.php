<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Asset;

use WPWaxCustomerSupportApp\Utility\Enqueuer\Enqueuer;

class Public_Asset extends Enqueuer {

    /**
     * Constuctor
     *
     */
    function __construct() {
        $this->asset_group = 'public';
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );

        parent::__construct();
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

        // $scripts['wpwax-customer-support-app-public-main-style'] = [
        //     'file_name' => 'public-main',
        //     'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_CSS_PATH,
        //     'deps'      => [],
        //     'ver'       => $this->script_version,
        //     'group'     => 'public',
        // ];

        // $scripts['wpwax-customer-support-app-messenger-public-style'] = [
        //     'file_name' => 'messenger-public',
        //     'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_CSS_PATH,
        //     'deps'      => [],
        //     'ver'       => $this->script_version,
        //     'group'     => 'public',
        // ];

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

        // $scripts['wpwax-customer-support-app-public-script'] = [
        //     'file_name'     => 'public-main',
        //     'base_path'     => WPWAX_CUSTOMER_SUPPORT_APP_JS_PATH,
        //     'deps'          => '',
        //     'ver'           => $this->script_version,
        //     'group'         => 'public',
        // ];

        $scripts['wpwax-customer-support-app-messenger-public-script'] = [
            'file_name' => 'messenger-public',
            'src_path'  => WPWAX_CUSTOMER_SUPPORT_APP_ASSET_SRC_PATH . 'modules/messenger/js/public/',
            'base_path' => WPWAX_CUSTOMER_SUPPORT_APP_JS_PATH,
            'group'     => 'public',
        ];

        $scripts          = array_merge( $this->js_scripts, $scripts );
        $this->js_scripts = $scripts;
    }
}