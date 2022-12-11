<?php

namespace HelpGent\Module\Core\Setup;

class Deactivation {

	/**
	 * Constuctor
	 *
	 * @return void
	 */
	public function __construct() {

		if ( ! is_admin() ) {
			return;
		}

		register_activation_hook( HELPGENT_FILE, [ $this, 'deactivatation_tasks' ] );
	}

	/**
	 * Dectivatation Tasks
	 *
	 * @return void
	 */
	public function deactivatation_tasks() {

		// Flush Rewrite Rules
		$this->flush_rewrite_rule();

		do_action( 'helpgent_after_deactivate' );
	}

	/**
	 * Flush Rewrite Rule
	 *
	 * @return void
	 */
	public function flush_rewrite_rule() {
		// Flush Rewrite Rules
		flush_rewrite_rules();
	}
}
