<?php

namespace HelpGent\Module\Core\Admin;

use HelpGent\Base\Helper;

class Admin_Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    public function admin_menu() {

        add_menu_page( __( 'HelpGent', 'helpgent' ), __( 'HelpGent', 'helpgent' ), 'manage_options', 'video-message', '', 'dashicons-format-chat', 77 );

        add_submenu_page( 'video-message', __( 'All Messages', 'helpgent' ), __( 'All Messages', 'helpgent' ), 'manage_options', 'video-message', [$this, 'all_messages'] );

        add_submenu_page( 'video-message', __( 'Forms', 'helpgent' ), __( 'Forms', 'helpgent' ), 'manage_options', 'vm-forms', [$this, 'forms'] );

        // add_submenu_page( 'video-message', __( 'Settings', 'helpgent' ), __( 'Settings', 'helpgent' ), 'manage_options', 'vm-settings', [$this, 'settings'] );

        // add_submenu_page( 'video-message', __( 'Integrations', 'helpgent' ), __( 'Integrations', 'helpgent' ), 'manage_options', 'vm-integrations', [$this, 'integrations'] );
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
