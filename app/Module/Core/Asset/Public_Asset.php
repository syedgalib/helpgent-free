<?php

namespace HelpGent\Module\Core\Asset;

use HelpGent\Utility\Enqueuer\Enqueuer;

class Public_Asset extends Enqueuer {

    /**
     * Constuctor
     *
     */
    function __construct() {
        $this->asset_group = 'public';
        add_action( 'wp_enqueue_scripts', [$this, 'enqueue_scripts'] );
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
     * Load Public CSS Scripts
     *
     * @Example
      $scripts['helpgent-core-public-style'] = [
          'file_name' => 'public',
          'base_path' => HELPGENT_CSS_PATH,
          'deps'      => [],
          'ver'       => $this->script_version,
          'group'     => 'public',
      ];
     *
     * @return void
     */
    public function add_css_scripts() {
        $scripts = [];

        // $scripts['helpgent-public-main-style'] = [
        //     'file_name' => 'public-main',
        //     'base_path' => HELPGENT_CSS_PATH,
        //     'deps'      => [],
        //     'ver'       => $this->script_version,
        //     'group'     => 'public',
        // ];

        $scripts['helpgent-core-public-fonts'] = [
            'file_name' => 'core-fonts',
            'base_path' => HELPGENT_CSS_PATH,
            'deps'      => [],
            'ver'       => $this->script_version,
            'group'     => 'public',
        ];

        $scripts['helpgent-core-public-style'] = [
            'file_name' => 'core-public',
            'base_path' => HELPGENT_CSS_PATH,
            'deps'      => [],
            'ver'       => $this->script_version,
            'group'     => 'public',
        ];

        $scripts           = array_merge( $this->css_scripts, $scripts );
        $this->css_scripts = $scripts;
    }

    /**
     * Load Public JS Scripts
     *
     * @Example
      $scripts['helpgent-core-public-script'] = [
          'file_name' => 'public',
          'src_path'  => HELPGENT_ASSET_SRC_PATH . 'modules/core/js/public/',
          'base_path' => HELPGENT_JS_PATH,
          'group'     => 'public',
          'data'      => [ 'object-key' => [] ],
      ];
     *
     * @return void
     */
    public function add_js_scripts() {
        $scripts = [];

        $scripts['helpgent-core-public-script'] = [
            'file_name' => 'core-public',
            'src_path'  => HELPGENT_ASSET_SRC_PATH . 'modules/core/js/public/',
            'base_path' => HELPGENT_JS_PATH,
            'group'     => 'public',
            'data'      => [
                'wpWaxCustomerSupportApp_CoreScriptData' => Script_Data::get_public_data(),
            ],
        ];

        $scripts          = array_merge( $this->js_scripts, $scripts );
        $this->js_scripts = $scripts;
    }
}