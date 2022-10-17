<?php

namespace WPWaxCustomerSupportApp\Module\Core\Setup;

use WPWaxCustomerSupportApp\Module\Core\Database\Prepare_Database;

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

		do_action( 'wpwax_customer_support_app_on_activation' );
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