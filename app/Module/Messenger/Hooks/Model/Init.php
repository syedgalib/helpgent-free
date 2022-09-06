<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Hooks\Model;

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
			Session_Term_Relationship_Model::class,
        ];
    }

}