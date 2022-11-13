<?php

namespace HelpGent\Module\Messenger\Rest_API\Version_1;

use HelpGent\Helper;

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
            Messages::class,
            Conversations::class,
        ];
    }

}