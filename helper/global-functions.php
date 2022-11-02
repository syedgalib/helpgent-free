<?php

/**
 * Change Upload Directory
 *
 * @param array $uploads
 * @return array $uploads
 */
function wpwax_vm_change_upload_directory( $uploads ) {
	$uploads['path']   = HELPGENT_UPLOAD_DIR_PATH;
	$uploads['url']    = HELPGENT_UPLOAD_DIR_URL;
	$uploads['subdir'] = '';

	return $uploads;
}

/**
 * Get duration of specified date
 *
 * @return string DateTime
 */
function helpgent_get_duration_date( $duration_in_days ) {
	$now     = current_time( 'mysql', true );
	$seconds = DAY_IN_SECONDS * $duration_in_days;
	$expiry = date( 'Y-m-d H:i:s', strtotime( $now ) + $seconds );

	return $expiry;
}