<?php

namespace WPWaxCustomerSupportApp\Module\Forms\Setup;

use WPWaxCustomerSupportApp\Module\Forms\Database\Prepare_Database;

class Activation {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'wpwax_customer_support_app_on_activation', [ $this, 'activatation_tasks' ] );

    }

	/**
	 * Activatation Tasks
	 *
	 * @return void
	 */
    public function activatation_tasks() {

		// Prepare Database
		new Prepare_Database();

	}


}