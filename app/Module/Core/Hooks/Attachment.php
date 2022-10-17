<?php

namespace WPWaxCustomerSupportApp\Module\Core\Hooks;

class Attachment {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_filter( 'upload_mimes', [ $this, 'add_additional_mimes_support' ] );
		// add_filter( 'init', [ $this, 'restrict_attachment_access' ] );
		// add_filter( 'template_redirect', [ $this, 'attachment_file' ] );
    }

	public function attachment_file( ) {

		$url = $_SERVER['REQUEST_URI'];

		$is_attachment_url = preg_match( '/\/wpwax-vm-attachment/', $url );

		if (  empty( $is_attachment_url ) ) {
			return;
		}

		$file =  WP_CONTENT_DIR . '/uploads/wpwax-vm/attachment_634cc9eaad94c6.34181514.png';

		$user_can_access_this_file = true;

		if ( file_exists( $file ) && $user_can_access_this_file ) {
			header('Content-Description: File Transfer');
			header('Content-Type: application/octet-stream');
			header('Content-Disposition: attachment; filename=filename.gif');
			header('Content-Transfer-Encoding: binary');
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Length: ' . filesize( $file ) );

			ob_clean();
			flush();
			readfile( $file );
		}

		die();
	}

	/**
	 *
	 */
	public function restrict_attachment_access() {

		// $url = $_SERVER;
		// var_dump( $url );

		header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );
		die( "<h2>Access Denied!</h2> This file is protected and not available to public." );
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