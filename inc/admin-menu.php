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

		add_menu_page( __( 'Video Message', 'wpwaxvm' ), __( 'Video Message', 'wpwaxvm' ), 'manage_options', 'video-message', '', 'dashicons-format-chat', 77 );

		add_submenu_page( 'video-message', __( 'All Messages', 'wpwaxvm' ), __( 'All Messages', 'wpwaxvm' ), 'manage_options', 'video-message', array( __CLASS__, 'all_messages' ) );

		add_submenu_page( 'video-message', __( 'Forms', 'wpwaxvm' ), __( 'Forms', 'wpwaxvm' ), 'manage_options', 'vm-forms', array( __CLASS__, 'forms' ) );

		add_submenu_page( 'video-message', __( 'Settings', 'wpwaxvm' ), __( 'Settings', 'wpwaxvm' ), 'manage_options', 'vm-settings', array( __CLASS__, 'settings' ) );

		add_submenu_page( 'video-message', __( 'Integrations', 'wpwaxvm' ), __( 'Integrations', 'wpwaxvm' ), 'manage_options', 'vm-integrations', array( __CLASS__, 'integrations' ) );
	}

	public static function all_messages() {
		include VM_PATH . 'inc/admin-ui/all-messages.php';
	}

	public static function forms() {
		$is_edit = ! empty( $_GET['mode'] ) && $_GET['mode'] == 'edit' ? true : false;

		if ( $is_edit ) {
			$id = ! empty( $_GET['formid'] ) ? (int) $_GET['formid'] : 'new';
			echo '<div id="wpwax-vm-form-edit" data-formid="' . $id . '"></div>';
		} else {
			echo '<div id="wpwax-vm-forms"></div>';
		}
	}

	public static function settings() {
		include VM_PATH . 'inc/admin-ui/settings.php';
	}

	public static function integrations() {
		include VM_PATH . 'inc/admin-ui/integrations.php';
	}
}
