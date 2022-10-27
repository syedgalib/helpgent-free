<?php

namespace WPWaxCustomerSupportApp\Module\Settings_Panel\Admin;

use WPWaxCustomerSupportApp\Base\Helper;

class Admin_Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    public function admin_menu() {
        add_submenu_page( 'video-message', __( 'Settings', 'wpwax-customer-support-app' ), __( 'Settings', 'wpwax-customer-support-app' ), 'manage_options', 'vm-settings', [$this, 'settings'] );
    }

    public function settings() {
        Helper\get_the_view( 'admin-ui/settings' );
    }

}
