<?php

namespace HelpGent\Module\Core\Admin\Admin_Menu;

class Admin_Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
        add_filter('plugin_action_links_' . plugin_basename(HELPGENT_FILE), [$this, 'plugin_action_links']);

    }

    public function plugin_action_links( $links ){
        $links[] = '<a target="_blank" href="' . esc_url( admin_url( 'admin.php?page=vm-settings' )) . '">Settings</a>';
		$links[] = '<a target="_blank" style="color: #39b54a;font-weight: 700;" href="' . esc_url('https://wpwax.com/helpgent/') . '">Get Pro</a>';

		return $links;
    }

    public function admin_menu() {
		$icon      = 'dashicons-format-chat';
		$icon_path = HELPGENT_ASSET_PATH . 'images/helpgent-icon.svg';

		if ( file_exists( $icon_path ) ) {
			$icon = file_get_contents( $icon_path );
			$icon = 'data:image/svg+xml;base64,' . base64_encode( $icon );
		}

        add_menu_page( __( 'HelpGent', 'helpgent' ), __( 'HelpGent', 'helpgent' ), 'manage_options', 'video-message', '', $icon, 25 );
    }
}
