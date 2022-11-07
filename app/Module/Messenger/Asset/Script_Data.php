<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Asset;

use WPWaxCustomerSupportApp\Base\Helper;

class Script_Data {

	public static function get_base_data() {
		return [
			'voiceRecordTimeLimit' => Helper\voice_record_time_limit(),
			'terms'                => Helper\get_terms(),
		];
	}

}