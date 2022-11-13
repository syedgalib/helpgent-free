<?php

namespace HelpGent\Module\Messenger\Asset;

use HelpGent\Base\Helper;

class Script_Data {

	public static function get_base_data() {
		return [
			'voiceRecordTimeLimit' => Helper\voice_record_time_limit(),
			'videoRecordTimeLimit' => Helper\video_record_time_limit(),
		];
	}

}