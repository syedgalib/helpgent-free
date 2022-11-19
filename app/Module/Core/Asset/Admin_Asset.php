<?php

namespace HelpGent\Module\Core\Asset;

use HelpGent\Utility\Enqueuer\Enqueuer;

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
     * @Example
      $scripts['helpgent-core-admin-style'] = [
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

        $scripts['helpgent-core-admin-style'] = [
            'file_name' => 'core-admin',
            'base_path' => HELPGENT_CSS_PATH,
            'deps'      => [],
            'ver'       => $this->script_version,
            'group'     => 'admin',
        ];

		$scripts['helpgent-core-admin-fonts'] = [
            'file_name' => 'core-fonts',
            'base_path' => HELPGENT_CSS_PATH,
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
     * @Example
      $scripts['helpgent-core-admin-script'] = [
          'file_name' => 'admin',
          'src_path'  => HELPGENT_ASSET_SRC_PATH . 'modules/core/js/admin/',
          'base_path' => HELPGENT_JS_PATH,
          'group'     => 'admin',
          'data'      => [ 'object-key' => [] ],
      ];
     *
     * @return void
     */
    public function add_js_scripts() {
        $scripts = [];

        $scripts['helpgent-core-admin-script'] = [
            'file_name' => 'core-admin',
            'src_path'  => HELPGENT_ASSET_SRC_PATH . 'modules/core/js/admin/',
            'base_path' => HELPGENT_JS_PATH,
            'group'     => 'admin',
            'data'      => [
                'wpWaxCustomerSupportApp_CoreScriptData' => Script_Data::get_base_data(),
            ],
        ];

        $scripts          = array_merge( $this->js_scripts, $scripts );
        $this->js_scripts = $scripts;
    }
}