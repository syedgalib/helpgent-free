<?php

namespace HelpGent\Module\Core\Setup;

use HelpGent\Module\Core\Database\Prepare_Database;

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

		do_action( 'helpgent_after_activate' );

		// Flush Rewrite Rules
		$this->flush_rewrite_rule();

		// Make sure to save installation time at the end.
		// Otherwise create_form won't work.
		$this->save_installation_time();
	}

	/**
	 * Flush Rewrite Rule
	 *
	 * @return void
	 */
	public function flush_rewrite_rule() {
		// Add Atachment Page Rewrite Rule
		( new \HelpGent\Module\Core\Hooks\Attachment() )->add_atachment_page_rewrite_rule();

		// Flush Rewrite Rules
		flush_rewrite_rules();
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

		fputs( $fh, 'Deny from all' );
		fclose( $fh );
	}

	/**
	 * Store installation time db for future reference.
	 *
	 * @return void
	 */
	protected function save_installation_time() {
		if ( ! get_option( 'helpgent_installation_time' ) ) {
			update_option( 'helpgent_installation_time', time(), 'no' );
		}
	}
}
