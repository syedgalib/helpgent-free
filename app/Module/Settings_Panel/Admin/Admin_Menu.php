<?php

namespace HelpGent\Module\Settings_Panel\Admin;

use HelpGent\Base\Helper;

class Admin_Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    public function admin_menu() {
        add_submenu_page( 'video-message', __( 'Settings', 'helpgent' ), __( 'Settings', 'helpgent' ), 'manage_options', 'vm-settings', [$this, 'settings'] );
        add_submenu_page( 'video-message', __( 'Go Pro', 'helpgent' ), '<a id="helpgent_pro_menu" style="color: #f06060; font-weight: bold;" href="https://wpwax.com/helpgent/" target="_blank"> ' . __( 'Go Pro', 'helpgent' ) . ' </a>', 'manage_options', '', __return_true() );
    }

    public function settings() {
        Helper\get_the_view( 'admin-ui/settings' );
    }

}
