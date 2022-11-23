<?php

namespace HelpGent\Module\Contacts\Admin;

use HelpGent\Base\Helper;

class Admin_Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    public function admin_menu() {
        add_submenu_page( 'video-message', __( 'Contacts', 'helpgent' ), __( 'Contacts', 'helpgent' ), 'manage_options', 'vm-contacts', [$this, 'contacts'] );
    }

    public function contacts() {
        Helper\get_the_view( 'admin-ui/contacts' );
    }

}
