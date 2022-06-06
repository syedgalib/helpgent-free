<?php

use WPWaxCustomerSupportApp\Controller;
use WPWaxCustomerSupportApp\Helper;

final class WPWaxCustomerSupportApp {

    private static $instance;

    /**
     * Constructor
     * 
     * @return void
     */
    private function __construct() {

        // Load Textdomain
        add_action('plugins_loaded', [ $this, 'load_textdomain' ] );

        // Register Controllers
        $controllers = $this->get_controllers();
        Helper\Serve::register_services( $controllers );

    }

    /**
     * Get Instance
     * 
     * @return WPWaxCustomerSupportApp
     */
    public static function get_instance() {
        
        if ( self::$instance === null ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Get Controllers
     * 
     * @return array Controllers
     */
    protected function get_controllers() {
        return [
            // Controller
            Controller\Init::class,
        ];
    }

    /**
     * Load Text Domain
     * 
     * @return void
     */
    public function load_textdomain() {
        load_plugin_textdomain( 'wpwax-customer-support-app', false, WPWAX_CUSTOMER_SUPPORT_APP_LANGUAGES );
    }

    /**
     * Cloning instances of the class is forbidden.
     * 
     * @return void
     */
    public function __clone() {
		_doing_it_wrong( __FUNCTION__, __('Cheatin&#8217; huh?', 'wpwax-customer-support-app'), '1.0' );
	}

    /**
     * Unserializing instances of the class is forbidden.
     * 
     * @return void
     */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, __('Cheatin&#8217; huh?', 'wpwax-customer-support-app'), '1.0' );
	}

}