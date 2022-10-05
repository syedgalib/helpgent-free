<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Asset;

use WPWaxCustomerSupportApp\Base\Helper;

class Script_Data {

	public static function get_base_data() {
		return [
			'voiceRecordTimeLimit' => WPWAX_CUSTOMER_SUPPORT_APP_VOICE_RECORD_TIME_LIMIT,
			'terms'                => Helper\get_terms(),
		];
	}

}