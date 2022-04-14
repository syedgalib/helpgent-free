<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Admin_Menu {

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'admin_menu' ) );
	}

    public static function admin_menu() {

		$settings = VM_PATH. 'inc/admin-ui/settings.php';

        add_menu_page( __( 'Video Message', 'wpwaxvm' ), __( 'Video Message', 'wpwaxvm' ), 'manage_options', 'video-message', '', 'dashicons-format-chat', 77 );

		add_submenu_page( 'video-message', __( 'All Messages', 'wpwaxvm' ), __( 'All Messages', 'wpwaxvm' ), 'manage_options', 'video-message', array( __CLASS__, 'all_messages' ) );

		add_submenu_page( 'video-message', __( 'Forms', 'wpwaxvm' ), __( 'Forms', 'wpwaxvm' ), 'manage_options', 'vm-forms', array( __CLASS__, 'forms' ) );

        add_submenu_page( 'video-message', __( 'Settings', 'wpwaxvm' ), __( 'Settings', 'wpwaxvm' ), 'manage_options', 'vm-settings', $settings );

		add_submenu_page( 'video-message', __( 'Integrations', 'wpwaxvm' ), __( 'Integrations', 'wpwaxvm' ), 'manage_options', 'vm-integrations', array( __CLASS__, 'integrations' ) );
    }

    public static function all_messages() {
		echo 'ttt';
    }

    public static function forms() {
		echo 'ttt';
    }

    public static function settings() {
		echo 'ttt';
    }

	public static function integrations() {
		echo 'ttt';
    }


}