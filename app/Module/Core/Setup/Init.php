<?php

namespace HelpGent\Module\Core\Setup;

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
            Activation::class,
            Deactivation::class,
            EDD_SL_Plugin_Updater::class,
        ];
    }

}