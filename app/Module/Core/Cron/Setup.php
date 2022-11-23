<?php

namespace HelpGent\Module\Core\Cron;

class Setup {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

		add_action( 'wp', [ $this, 'cron_event' ] );

		$this->unscheduled_cron();

    }

	/**
	 * Remove custom cron evernt on deactivation
	 *
	 * @return void
	 */

	public function unscheduled_cron() {
		register_deactivation_hook( HELPGENT_FILE, function() {
			$timestamp = wp_next_scheduled( 'helpgent_daily_cron' );
    		wp_unschedule_event( $timestamp, 'helpgent_daily_cron' );
		});
	}

	/**
	 * Add custom cron evernt
	 *
	 * @return void
	 */
    public function cron_event() {
		if ( ! wp_next_scheduled( 'helpgent_daily_cron' ) ) {
			wp_schedule_event( time(), 'daily', 'helpgent_daily_cron' );
		}
	}


}