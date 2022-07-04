<?php

namespace WPWaxCustomerSupportApp\Module\Chatbox_Template\Asset;

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
            Admin_Asset::class,
        ];
    }
}