<?php

namespace HelpGent\Module\Settings_Panel\Setup;

use HelpGent\Base\Helper;
use HelpGent\Module\Settings_Panel\Model\Settings_Model;

class Activation {

	/**
	 * Constuctor
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'helpgent_on_activation', [ $this, 'update_initial_settings_data' ] );
	}

	/**
	 * Update initial settings data
	 *
	 * @return void
	 */
	public function update_initial_settings_data() {

		$options = Helper\get_options();

		if ( ! empty( $options ) ) {
			return;
		}

		Helper\update_options( Settings_Model::get_default_options() );
	}

}
