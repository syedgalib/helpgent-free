<?php

namespace HelpGent\Module;

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
			Core\Init::class,
            Settings_Panel\Init::class,
            Messenger\Init::class,
            Forms\Init::class,
            Settings_Panel\Init::class,
            // Contacts\Init::class,
        ];
    }

}