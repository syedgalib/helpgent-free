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

		do_action( 'wpwax_customer_support_app_on_activation' );
	}


}