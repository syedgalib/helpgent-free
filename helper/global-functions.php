<?php

/**
 * Change Upload Directory
 *
 * @param array $uploads
 * @return array $uploads
 */
function helpgent_change_upload_directory( $uploads ) {
	$uploads['path']   = HELPGENT_UPLOAD_DIR_PATH;
	$uploads['url']    = HELPGENT_UPLOAD_DIR_URL;
	$uploads['subdir'] = '';

	return $uploads;
}

/**
 * Clean variables using sanitize_text_field. Arrays are cleaned recursively.
 * Non-scalar values are ignored.
 *
 * @param string|array $var Data to sanitize.
 * @return string|array
 */
function helpgent_clean( $var ) {
	if ( is_array( $var ) ) {
		return array_map( 'helpgent_clean', $var );
	} else {
		return is_scalar($var) ? sanitize_text_field($var) : $var;
	}
}