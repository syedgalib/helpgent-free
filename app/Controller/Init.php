<?php

namespace WPWaxCustomerSupportApp\Controller;

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
            Asset\Init::class,
            CPT\Init::class,
            Admin\Init::class,
            Ajax\Init::class,
            Hook\Init::class,
            Rest_API\Init::class,
            Shortcode\Init::class,
        ];
    }

}