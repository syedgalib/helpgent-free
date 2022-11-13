<?php

namespace HelpGent\Module\Forms\Admin;

class Admin_Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    public function admin_menu() {
        add_submenu_page( 'video-message', __( 'Forms', 'helpgent' ), __( 'Forms', 'helpgent' ), 'manage_options', 'vm-forms', [ $this, 'forms' ] );
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

}
