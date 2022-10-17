<?php

namespace WPWaxCustomerSupportApp\Module\Core\Hooks;

use WP_Error;
use WPWaxCustomerSupportApp\Module\Core\Model\Attachment_Model;

class Attachment {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_filter( 'upload_mimes', [ $this, 'add_additional_mimes_support' ] );
		add_action( 'admin_post_dynamic_attachment_link', [ $this, 'dynamic_attachment_link' ] );
    }

	/**
	 * Dynamic Attachment Link
	 *
	 * @return void
	 */
	public function dynamic_attachment_link() {

		if ( ! $this->is_user_authenticated() ) {
			status_header(403);
			die('You are not allowed to access the file.');
		}

		$attachment_id = ( ! empty( $_GET['attachment_id'] ) && is_numeric( $_GET['attachment_id'] ) ) ? ( int ) $_GET['attachment_id'] : 0;

		if ( empty( $attachment_id ) ) {
			status_header(404);
			die('File not found.');
		}

		$attachment = Attachment_Model::get_item( $attachment_id );

		if ( is_wp_error( $attachment ) ) {
			status_header(403);
			die( $attachment->get_error_message() );
		}

		$matches = [];

		preg_match( '/attachment_.+$/', $attachment[ 'link' ], $matches );

		if ( empty( $matches ) ) {
			status_header(404);
			die('File not found.');
		}

		$file_name = $matches[0];
		$file      = WP_CONTENT_DIR . '/uploads/wpwax-vm/' . $file_name;

		$user_can_access_this_file = true;

		if ( file_exists( $file ) && $user_can_access_this_file ) {
			header('Content-Type: application/octet-stream');
			header( "Content-Disposition: attachment; filename=" . basename( $file_name ) );
			header('Content-Transfer-Encoding: binary');
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize( $file ) );
			readfile( $file );
		}

		die();
	}

	/**
	 * Is User Authenticated
	 *
	 * @return bool Status
	 */
	public function is_user_authenticated() {

		if ( current_user_can( 'administrator' ) || current_user_can( 'wpwax_vm_client' ) ) {
			return true;
		}

		return false;
	}

    /**
     * Add Additional Mimes Support
     *
	 * @param array $mime_types
     * @return array
     */
    public function add_additional_mimes_support( $mime_types = [] ) {

		$mime_types['webm'] = 'video/webm';

		return $mime_types;

    }

}