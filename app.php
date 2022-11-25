<?php

use HelpGent\Module;
use HelpGent\Helper;

final class HelpGent {

    /**
     * @var mixed
     */
    private static $instance;

    /**
     * Constructor
     *
     * @return void
     */
    private function __construct() {

        // Load Textdomain
        add_action( 'plugins_loaded', [$this, 'load_textdomain'] );

        // Register Controllers
        $controllers = $this->get_controllers();
        Helper\Serve::register_services( $controllers );

    }

    /**
     * Get Instance
     *
     * @return HelpGent
     */
    public static function get_instance() {

        if ( null === self::$instance ) {
            self::$instance = new self();

			/**
			 * Fire loaded action hook once everything is loaded.
			 *
			 * Call anything safely once Helpgent is fully loaded with all functionalites.
			 * For example, all the helpgent extensions can use this hook to load safely.
			 * Usage:
			 * add_action( 'helpgent_loaded', static function( $instance ) {
			 *     $instance->{any prop or method}
			 * } );
			 *
			 * @since 0.1.0
			 *
			 * @param object Instance of HelpGent
			 */
			do_action( 'helpgent_loaded', self::$instance );
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
            // Module
            Module\Init::class,
        ];
    }

    /**
     * Load Text Domain
     *
     * @return void
     */
    public function load_textdomain() {
        load_plugin_textdomain( 'helpgent', false, HELPGENT_LANGUAGES );
    }

    /**
     * Cloning instances of the class is forbidden.
     *
     * @return void
     */
    public function __clone() {
        _doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'helpgent' ), '1.0' );
    }

    /**
     * Unserializing instances of the class is forbidden.
     *
     * @return void
     */
    public function __wakeup() {
        _doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'helpgent' ), '1.0' );
    }

}
