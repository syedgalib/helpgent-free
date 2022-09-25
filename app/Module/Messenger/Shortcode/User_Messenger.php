<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Shortcode;

class User_Messenger {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_shortcode( 'wpwax_video_support_user_messenger', [ $this, 'render' ] );

    }

    public function render() {

		if ( get_current_user_id() < 1 ) {

			$message = __( 'You need to be logged in to view this content.' );

			return "<div class='wpwax-vm-notice-container'><p class='wpwax-vm-notice wpwax-vm-notice-warning wpwax-vm-text-center'>${message}</p></div>";
		}

        return '<div id="wpwax-vm-chatboard"></div>';
    }

}