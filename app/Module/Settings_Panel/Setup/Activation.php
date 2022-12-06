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
		add_action( 'helpgent_after_activate', [ $this, 'update_initial_settings_data' ] );
	}

	/**
	 * Update initial settings data
	 *
	 * @return void
	 */
	public function update_initial_settings_data() {

		if ( ! empty( Helper\get_options() ) ) {
			return;
		}

		Helper\update_options( Settings_Model::get_default_options() );
	}

}
