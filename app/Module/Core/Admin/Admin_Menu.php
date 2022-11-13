<?php

namespace HelpGent\Module\Core\Admin;

class Admin_Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
    }

    public function admin_menu() {
		$icon      = 'dashicons-format-chat';
		$icon_path = HELPGENT_ASSET_PATH . 'images/helpgent-icon.svg';

		if ( file_exists( $icon_path ) ) {
			$icon = file_get_contents( $icon_path );
			$icon = 'data:image/svg+xml;base64,' . base64_encode( $icon );
		}

        add_menu_page( __( 'HelpGent', 'helpgent' ), __( 'HelpGent', 'helpgent' ), 'manage_options', 'video-message', '', $icon, 77 );
    }
}
