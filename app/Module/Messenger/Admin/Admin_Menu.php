<?php

namespace HelpGent\Module\Messenger\Admin;

use HelpGent\Base\Helper;

class Admin_Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    public function admin_menu() {
        add_submenu_page( 'video-message', __( 'All Messages', 'helpgent' ), __( 'All Messages', 'helpgent' ), 'manage_options', 'video-message', [ $this, 'all_messages' ] );
    }

    public function all_messages() {
        Helper\get_the_view( 'admin-ui/all-messages' );
    }

}
