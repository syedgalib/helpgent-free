<?php

namespace WPWaxCustomerSupportApp\Module\Core\Admin;

use WPWaxCustomerSupportApp\Base\Helper;

class Admin_Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    public function admin_menu() {

        add_menu_page( __( 'Video Message', 'wpwax-customer-support-app' ), __( 'Video Message', 'wpwax-customer-support-app' ), 'manage_options', 'video-message', '', 'dashicons-format-chat', 77 );

        add_submenu_page( 'video-message', __( 'All Messages', 'wpwax-customer-support-app' ), __( 'All Messages', 'wpwax-customer-support-app' ), 'manage_options', 'video-message', [$this, 'all_messages'] );

        add_submenu_page( 'video-message', __( 'Forms', 'wpwax-customer-support-app' ), __( 'Forms', 'wpwax-customer-support-app' ), 'manage_options', 'vm-forms', [$this, 'forms'] );

        add_submenu_page( 'video-message', __( 'Settings', 'wpwax-customer-support-app' ), __( 'Settings', 'wpwax-customer-support-app' ), 'manage_options', 'vm-settings', [$this, 'settings'] );

        add_submenu_page( 'video-message', __( 'Integrations', 'wpwax-customer-support-app' ), __( 'Integrations', 'wpwax-customer-support-app' ), 'manage_options', 'vm-integrations', [$this, 'integrations'] );
    }

    public function all_messages() {
        Helper\get_the_view( 'admin-ui/all-messages' );
    }

    public function forms() {
        $is_edit = ! empty( $_GET['mode'] ) && 'edit' == $_GET['mode'] ? true : false;

        if ( $is_edit ) {
            $id = ! empty( $_GET['formid'] ) ? (int) $_GET['formid'] : 'new';
            echo '<div id="wpwax-vm-form-edit" data-formid="' . $id . '"></div>';
        } else {
            echo '<div id="wpwax-vm-forms"></div>';
        }

    }

    public function settings() {
        Helper\get_the_view( 'admin-ui/settings' );
    }

    public function integrations() {
        Helper\get_the_view( 'admin-ui/integrations' );
    }

}
