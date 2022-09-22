<?php

namespace WPWaxCustomerSupportApp\Module\Core\Asset;

use WPWaxCustomerSupportApp\Helper;

class Init {

    /**
     * Constuctor
     *
     */
    function __construct() {

        // Register Enqueuers
        $enqueuers = $this->get_assets_enqueuers();
        Helper\Serve::register_services( $enqueuers );

    }

    private function get_assets_enqueuers() {
        return [
            Global_Asset::class,
            Admin_Asset::class,
            Public_Asset::class,
        ];
    }
}