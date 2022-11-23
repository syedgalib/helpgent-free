<?php

namespace HelpGent\Module\Messenger\Asset;

use HelpGent\Utility\Enqueuer\Enqueuer;

class Admin_Asset extends Enqueuer {

	public $messenger_pages = [ 'toplevel_page_video-message' ];

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
     * @Example
      $scripts['helpgent-messenger-admin-style'] = [
          'file_name' => 'admin',
          'base_path' => HELPGENT_CSS_PATH,
          'deps'      => [],
          'ver'       => $this->script_version,
          'group'     => 'admin',
      ];
     *
     * @return void
     */
    public function add_css_scripts() {
        $scripts = [];

        $scripts           = array_merge( $this->css_scripts, $scripts );
        $this->css_scripts = $scripts;
    }

    /**
     * Load Admin JS Scripts
     *
     * @Example
      $scripts['helpgent-messenger-admin-script'] = [
          'file_name' => 'admin',
          'src_path'  => HELPGENT_ASSET_SRC_PATH . 'modules/messenger/js/admin/',
          'base_path' => HELPGENT_JS_PATH,
          'group'     => 'admin',
          'data'      => [ 'object-key' => [] ],
      ];
     *
     * @return void
     */
    public function add_js_scripts() {
        $scripts = [];

        $scripts['helpgent-messenger-admin-script'] = [
            'file_name' => 'messenger-admin',
            'src_path'  => HELPGENT_ASSET_SRC_PATH . 'modules/messenger/js/admin/',
            'base_path' => HELPGENT_JS_PATH,
            'group'     => 'admin',
            'page'      => $this->messenger_pages,
            'data'      => [
                'wpWaxCustomerSupportApp_MessengerScriptData' => Script_Data::get_base_data(),
            ],
        ];

        $scripts          = array_merge( $this->js_scripts, $scripts );
        $this->js_scripts = $scripts;
    }
}