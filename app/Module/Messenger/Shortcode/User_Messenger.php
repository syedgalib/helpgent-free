<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Shortcode;

use WPWaxCustomerSupportApp\Base\Helper;

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
		if ( Helper\has_expaired_token() ) {
			$email = Helper\get_auth_expaired_token_email();
			return '<div id="wpwax-vm-token-resend-app" data-token-email="' . $email . '" class="wpwax-vm-notice-container"></div>';
		}

		if ( ! Helper\current_can_use_messanger_app() ) {

			$message = __( 'You need to be logged in to view this content.' );

			return "<div class='wpwax-vm-notice-container'><p class='wpwax-vm-notice wpwax-vm-notice-warning wpwax-vm-text-center'>${message}</p></div>";
		}

        return '<div id="wpwax-vm-chatboard" class="wpwax-vm-app-container-full"></div>';
    }

}