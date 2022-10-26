<?php

namespace WPWaxCustomerSupportApp\Module\Core\Rest_API\Version_1;

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
     * @return array Controllers
     */
    protected function get_controllers() {
        return [
            Users::class,
            Terms::class,
            Attachment::class,
        ];
    }

}