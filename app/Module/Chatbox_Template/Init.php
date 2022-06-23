<?php

namespace WPWaxCustomerSupportApp\Module\Chatbox_Template;

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
            Setup\Init::class,
            Rest_API\Init::class,
            Asset\Init::class,
            Admin\Init::class,
        ];
    }

}