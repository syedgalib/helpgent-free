<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Shortcode;

class User_Dashboard {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_shortcode( 'wpwax_video_support', [$this, 'load_ui'] );

    }

    public function load_ui() {
        echo '<div id="wpwax-vm-chatbox"></div>';
    }

}