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