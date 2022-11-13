<?php

namespace HelpGent\Module\Settings_Panel\Asset;

use HelpGent\Utility\Enqueuer\Enqueuer;
use HelpGent\Base\Helper;
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
      $scripts['helpgent-settings-panel-admin-style'] = [
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
      $scripts['helpgent-settings-panel-admin-script'] = [
          'file_name' => 'admin',
          'base_path' => HELPGENT_JS_PATH,
          'group'     => 'admin',
          'data'      => [ 'object-key' => [] ],
      ];
     *
     * @return void
     */
    public function add_js_scripts() {
        $scripts = [];

        $scripts['helpgent-settings-panel-admin-script'] = [
            'file_name' => 'settings-panel-admin',
            'base_path' => HELPGENT_JS_PATH,
            'group'     => 'admin',
            'data'      => [
                'SettingsScriptData' => [
                    'pages'     => Helper\get_wp_pages(),
                ],
            ],
        ];

        $scripts          = array_merge( $this->js_scripts, $scripts );
        $this->js_scripts = $scripts;
    }
}