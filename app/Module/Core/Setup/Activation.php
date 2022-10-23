<?php

namespace WPWaxCustomerSupportApp\Module\Core\Setup;

use WPWaxCustomerSupportApp\Module\Core\Database\Prepare_Database;
use WPWaxCustomerSupportApp\Base\Helper;

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

        register_activation_hook( WPWAX_CUSTOMER_SUPPORT_APP_FILE, [ $this, 'activatation_tasks' ] );
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
		$this->create_page();

		do_action( 'wpwax_customer_support_app_on_activation' );
	}

	public function create_page() {

		$user_dashboard = Helper\get_option( 'userDashboardPage' );

		if ( ! $user_dashboard ) {
			$page_id = wp_insert_post(
				[
					'post_title'     => 'All Messages',
					'post_content'   => '[wpwax_video_support_user_messenger]',
					'post_status'    => 'publish',
					'post_type'      => 'page',
					'comment_status' => 'closed',
				]
			);
		}
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
		$uploads_dir = trailingslashit( wp_upload_dir()['basedir'] ) . 'wpwax-vm';
		wp_mkdir_p( $uploads_dir );


		// Create htaccess file
		$fh = fopen( $uploads_dir . "/.htaccess", "w" );

		if ( $fh == false ) {
			return;
		}

		fputs ( $fh, 'Deny from all' );
		fclose( $fh );
	}


}