<?php

namespace HelpGent\Module\Core;

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
     * @return array
     */
    protected function get_controllers() {
        return [
            Setup\Init::class,
            Hooks\Init::class,
            Asset\Init::class,
            Admin\Init::class,
            Rest_API\Init::class,
            Cron\Init::class,
        ];
    }

}