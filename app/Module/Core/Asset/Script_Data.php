<?php

namespace WPWaxCustomerSupportApp\Module\Core\Asset;

use WPWaxCustomerSupportApp\Base\Helper;

class Script_Data {

	public static function get_base_data() {
		return [
			'apiEndpoint'                => rest_url( 'wpwax_cs/v1' ),
			'apiNonce'                   => wp_create_nonce( 'wp_rest' ),
			'wp_pages'                   => Helper\get_wp_pages(),
			'admin_roles'                => Helper\get_admin_roles(),
			'is_user_admin'              => Helper\is_user_admin( Helper\get_current_user( true ) ),
			'current_user'               => Helper\get_current_user(),
			'admin_user'                 => Helper\get_admin_user(),
			'supported_video_extensions' => Helper\get_mime_types( 'video', 'extension' ),
			'max_upload_size'            => wp_max_upload_size(),
		];
	}

	public static function get_public_data() {
		$base_data = self::get_base_data();

		$public_data = [
			'currentPageID' => get_the_ID(),
			'isFrontPage'   => is_front_page(),
			'isHome'        => is_home(),
		];

		return array_merge( $base_data, $public_data );
	}

}