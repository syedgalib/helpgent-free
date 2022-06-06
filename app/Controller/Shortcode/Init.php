<?php

namespace WPWaxCustomerSupportApp\Controller\Shortcode;

use WPWaxCustomerSupportApp\Helper;

class Init {

    /**
	 * Constuctor
	 * 
     * @return void
	 */
	public function __construct() {

		// Register Controllers
        $controllers = $this->get_controllers();
        Helper\Serve::register_services( $controllers );

	}

    /**
	 * Controllers
	 * 
     * @return array
	 */
	protected function get_controllers() {
        return [
            
        ];
    }

}