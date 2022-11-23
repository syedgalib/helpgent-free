<?php

namespace HelpGent\Module\Forms\Asset;

use HelpGent\Utility\Enqueuer\Enqueuer;

class Admin_Asset extends Enqueuer
{

	public $forms_pages = [ 'helpgent_page_vm-forms' ];

    /**
     * Constuctor
     *
     */
    function __construct()
    {
        $this->asset_group = 'admin';
        add_action('admin_enqueue_scripts', [$this, 'enqueue_lib_scripts']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_scripts']);
    }

    /**
     * Load Admin CSS Scripts
     *
     * @return void
     */
    public function load_scripts()
    {
        $this->add_css_scripts();
        $this->add_js_scripts();
    }

    /**
     * Load Library Scripts
     *
     * @return void
     */
    public function enqueue_lib_scripts()
    {
        wp_enqueue_media();
    }

    /**
     * Load Admin CSS Scripts
     *
     * @Example
      $scripts['helpgent-chatbox-template-admin-style'] = [
          'file_name' => 'admin',
          'base_path' => HELPGENT_CSS_PATH,
          'deps'      => [],
          'ver'       => $this->script_version,
          'group'     => 'admin',
      ];
     *
     * @return void
     */
    public function add_css_scripts()
    {
        $scripts = [];

        $scripts           = array_merge($this->css_scripts, $scripts);
        $this->css_scripts = $scripts;
    }

    /**
     * Load Admin JS Scripts
     *
     * @Example
      $scripts['helpgent-chatbox-template-admin-script'] = [
          'file_name' => 'admin',
          'src_path'  => HELPGENT_ASSET_SRC_PATH . 'modules/chatboxTemplate/js/admin/',
          'base_path' => HELPGENT_JS_PATH,
          'group'     => 'admin',
          'data'      => [ 'object-key' => [] ],
      ];
     *
     * @return void
     */
    public function add_js_scripts()
    {
        $scripts = [];

        $scripts['helpgent-forms-admin-script'] = [
            'file_name' => 'forms-admin',
            'base_path' => HELPGENT_JS_PATH,
            'src_path'  => HELPGENT_ASSET_SRC_PATH . 'modules/chatboxTemplate/js/admin/',
            'deps'      => [],
            'ver'       => $this->script_version,
            'group'     => 'admin',
			'page'      => $this->forms_pages,
        ];

        $scripts          = array_merge($this->js_scripts, $scripts);
        $this->js_scripts = $scripts;
    }
}
