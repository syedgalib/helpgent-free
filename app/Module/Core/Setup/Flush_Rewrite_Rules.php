<?php

namespace HelpGent\Module\Core\Setup;

class Flush_Rewrite_Rules {

	/**
	 * Constuctor
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'helpgent_loaded', [ $this, 'flush_rewrite_rules' ] );
	}

	/**
	 * Flush Rewrite Rules
	 *
	 * @return void
	 */
	public function flush_rewrite_rules() {
		$has_flushed = get_transient( 'helpgent_has_flushed_rewrite_rules' );

		if ( ! empty( $has_flushed ) ) {
			return;
		}

		flush_rewrite_rules();

		set_transient( 'helpgent_has_flushed_rewrite_rules', true );
	}
}
