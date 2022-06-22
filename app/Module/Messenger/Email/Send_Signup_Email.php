<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Email;

class Send_Signup_Email {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'wpwax_customer_support_app_rest_insert_user', [ $this, 'send' ], 20, 1 );

    }

    /**
     * Send
     *
     * @return void
     */
    public function send( $creating = true ) {

        if ( ! $creating ) {
            return;
        }

        // 

    }

}