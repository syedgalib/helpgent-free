<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Admin_Menu {

	public function __construct() {
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );
	}

	public function admin_menu() {

		add_menu_page( __( 'Video Message', 'wpwaxvm' ), __( 'Video Message', 'wpwaxvm' ), 'manage_options', 'video-message', '', 'dashicons-format-chat', 77 );

		add_submenu_page( 'video-message', __( 'All Messages', 'wpwaxvm' ), __( 'All Messages', 'wpwaxvm' ), 'manage_options', 'video-message', array( $this, 'all_messages' ) );

		add_submenu_page( 'video-message', __( 'Forms', 'wpwaxvm' ), __( 'Forms', 'wpwaxvm' ), 'manage_options', 'vm-forms', array( $this, 'forms' ) );

		add_submenu_page( 'video-message', __( 'Settings', 'wpwaxvm' ), __( 'Settings', 'wpwaxvm' ), 'manage_options', 'vm-settings', array( $this, 'settings' ) );

		add_submenu_page( 'video-message', __( 'Integrations', 'wpwaxvm' ), __( 'Integrations', 'wpwaxvm' ), 'manage_options', 'vm-integrations', array( $this, 'integrations' ) );
	}

	public function all_messages() {
		include VM_PATH_INC . 'admin-ui/all-messages.php';
	}

	public function forms() {
		$is_edit = ! empty( $_GET['mode'] ) && $_GET['mode'] == 'edit' ? true : false;

		if ( $is_edit ) {
			$id = ! empty( $_GET['formid'] ) ? (int) $_GET['formid'] : 'new';
			echo '<div id="wpwax-vm-form-edit" data-formid="' . $id . '"></div>';
		} else {
			echo '<div id="wpwax-vm-forms"></div>';
		}
	}

	public function settings() {
		include VM_PATH_INC . 'admin-ui/settings.php';
	}

	public function integrations() {
		include VM_PATH_INC . 'admin-ui/integrations.php';
	}
}
