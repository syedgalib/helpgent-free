<?php

namespace HelpGent\Module\Messenger\Setup;
use HelpGent\Base\Helper;
class Config {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        $this->define_const();

    }

	/**
	 * Activatation Tasks
	 *
	 * @return void
	 */
    protected function define_const() {

		defined( 'HELPGENT_VOICE_RECORD_TIME_LIMIT' ) || define( 'HELPGENT_VOICE_RECORD_TIME_LIMIT', apply_filters( 'wpwax_customer_support_app_voice_record_time_limit', Helper\get_option( 'maxVideoLength', 2 ) ) );

	}


}