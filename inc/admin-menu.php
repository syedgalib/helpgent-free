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

        add_menu_page( __( 'Video Message22', 'wpwaxvm' ), __( 'Video Message', 'wpwaxvm' ), '', 'video-message', array( $this, 'plugin_page' ), 'dashicons-groups', null );

        add_submenu_page( 'video-message', __( 'Video Message', 'wpwaxvm' ), __( 'Video Message', 'wpwaxvm' ), '', 'video-message', array( $this, 'plugin_page' ) );
    }

    public function plugin_page() {
        $action = isset( $_GET['action'] ) ? $_GET['action'] : 'list';
        $id     = isset( $_GET['id'] ) ? intval( $_GET['id'] ) : 0;

        switch ($action) {
            case 'view':

                $template = dirname( __FILE__ ) . '/views/vm-single.php';
                break;

            case 'edit':
                $template = dirname( __FILE__ ) . '/views/vm-edit.php';
                break;

            case 'new':
                $template = dirname( __FILE__ ) . '/views/vm-new.php';
                break;

            default:
                $template = dirname( __FILE__ ) . '/views/vm-list.php';
                break;
        }

        if ( file_exists( $template ) ) {
            include $template;
        }
    }


}