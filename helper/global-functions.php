<?php

/**
 * Change Upload Directory
 *
 * @param array $uploads
 * @return array $uploads
 */
function wpwax_vm_change_upload_directory( $uploads ) {
	$uploads['path']   = WP_CONTENT_DIR . '/uploads/wpwax-vm';
	$uploads['url']    = WP_CONTENT_URL . '/uploads/wpwax-vm';
	$uploads['subdir'] = '';

	return $uploads;
}