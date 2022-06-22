<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Public;

class Chatbox {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'wp_footer', [$this, 'load_ui'] );

    }

    public function load_ui() {
        echo '<div id="wpwax-vm-chatbox"></div>';
    }

}