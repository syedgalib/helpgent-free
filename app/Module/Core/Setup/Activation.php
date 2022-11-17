<?php

namespace HelpGent\Module\Core\Setup;

use HelpGent\Module\Core\Database\Prepare_Database;
use HelpGent\Base\Helper;

class Activation {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        if ( ! is_admin() ) {
            return;
        }

        register_activation_hook( HELPGENT_FILE, [ $this, 'activatation_tasks' ] );
    }

	/**
	 * Activatation Tasks
	 *
	 * @return void
	 */
    public function activatation_tasks() {

		// Prepare Database
		new Prepare_Database();

		// Prepare Attachment Folder
		$this->prepare_attachment_folder();

		// Create required page
		$this->create_page();

		do_action( 'helpgent_on_activation' );
	}

	/**
	 * Create user dashboard page for all messages
	 *
	 * @return void
	 */
	public function create_page() {

		$user_dashboard = Helper\get_option( 'userDashboardPage' );

		if( $user_dashboard ) {
			return;
		}

		$page_id = wp_insert_post(
			[
				'post_title'     => 'All Messages',
				'post_content'   => '[helpgent_messages]',
				'post_status'    => 'publish',
				'post_type'      => 'page',
				'comment_status' => 'closed',
			]
		);

		if ( ! is_wp_error( $page_id ) ) {
			Helper\update_option( 'userDashboardPage', $page_id );
		}
	}

	/**
	 * Prepare Attachment Folder
	 *
	 * @return void
	 */
	public function prepare_attachment_folder() {

		// Create Upload Directory
		wp_mkdir_p( HELPGENT_UPLOAD_DIR_PATH );

		// Create htaccess file
		$fh = fopen( HELPGENT_UPLOAD_DIR_PATH . "/.htaccess", "w" );

		if ( $fh == false ) {
			return;
		}

		fputs ( $fh, 'Deny from all' );
		fclose( $fh );
	}


}