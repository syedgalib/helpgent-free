<?php
/**
 * @author  wpWax
 */

namespace wpWax\vm;

class Helper {

	public static function get_img( $filename ) {
		$path = 'assets/img/' . $filename;

		return self::get_file_uri( $path );
	}

	public static function get_css( $filename ) {
		$path = 'assets/css/' . $filename . '.css';

		return self::get_file_uri( $path );
	}

	public static function get_js( $filename ) {
		$path = 'assets/js/' . $filename . '.js';

		if ( VM_IN_DEVELOPMENT ) {
			$path = VM_VITE_BASE . 'src/js/' . $filename . '.js';

			return $path;
		}

		return self::get_file_uri( $path );
	}

	public static function get_vendor_assets( $file ) {
		$path = 'assets/vendors/' . $file;

		return self::get_file_uri( $path );
	}

	private static function get_file_uri( $path ) {
		$file = VM_URL . $path;
		return $file;
	}
}
