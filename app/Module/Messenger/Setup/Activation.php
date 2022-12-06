<?php

namespace HelpGent\Module\Messenger\Setup;

use HelpGent\Module\Messenger\Database\Prepare_Database;
use HelpGent\Base\Helper;

class Activation {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'helpgent_on_activation', [ $this, 'activatation_tasks' ] );

    }

	/**
	 * Activatation Tasks
	 *
	 * @return void
	 */
    public function activatation_tasks() {

		// Prepare Database
		new Prepare_Database();

		// Create required page
		$this->create_page();

	}

	/**
	 * Create user dashboard page for all messages
	 *
	 * @return void
	 */
	public function create_page() {

		$user_dashboard = Helper\get_option( 'userDashboardPage' );

		if ( $user_dashboard ) {
			return;
		}

		$page_id = wp_insert_post([
			'post_title'     => 'All Messages',
			'post_content'   => '[helpgent_messages]',
			'post_status'    => 'publish',
			'post_type'      => 'page',
			'comment_status' => 'closed',
		]);

		if ( ! is_wp_error( $page_id ) ) {
			Helper\update_option( 'userDashboardPage', $page_id );
		}
	}


}