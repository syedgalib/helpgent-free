<?php

namespace HelpGent\Module\Core\Hooks;

use HelpGent\Module\Core\Model\Attachment_Model;
use HelpGent\Base\Helper;
class Attachment {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_filter( 'upload_mimes', [ $this, 'add_additional_mimes_support' ], 20, 1 );
		add_action( 'init', [ $this, 'add_atachment_page_rewrite_rule' ] );
		add_action( 'template_redirect', [ $this, 'setup_attachment_page' ] );
    }

	/**
	 * Dynamic Attachment Link
	 *
	 * @return void
	 */
	public function add_atachment_page_rewrite_rule() {
		add_rewrite_rule( "helpgent-attachment/([0-9]+)/?$", 'index.php', 'top' );
		Helper\flush_rewrite_rule_once();
	}

	/**
	 * Setup Attachment page
	 *
	 * @return mixed
	 */
	public function setup_attachment_page() {
		global $wp;

		$matches = [];
		$has_match = preg_match( '/helpgent-attachment\/([0-9]+)/', $wp->request, $matches );

		$attachment_id = ( count( $matches ) > 1 ) ? ( int ) $matches[1] : 0;

		if ( ! $has_match ) {
			return;
		}

		if ( ! Helper\is_user_authenticated() ) {
			status_header(403);
			die('You are not allowed to access the file.');
		}

		if ( empty( $attachment_id ) ) {
			status_header( 404 );
			die('File not found.');
		}

		$attachment = Attachment_Model::get_item( $attachment_id );

		if ( is_wp_error( $attachment ) ) {
			status_header( 403 );
			die( esc_html( $attachment->get_error_message() ) );
		}

		if ( ! Helper\current_user_can_access_the_attachment( $attachment_id ) ) {
			status_header( 403 );
			die('You are not allowed to access the file.');
		}

		$matches = [];

		$upload_dir_url = HELPGENT_UPLOAD_DIR_URL . '/';

		$file_name = str_replace( $upload_dir_url, '', $attachment[ 'url' ] );
		$file      = HELPGENT_UPLOAD_DIR_PATH . '/' . $file_name;

		if ( ! file_exists( $file ) ) {
			die();
		}

		$render = ( ! empty( $_GET['render'] ) ) ? true : false;

		header( 'Content-Type: ' . $attachment['media_type'] );
		header( "Content-Disposition: attachment; filename=" . basename( $file_name ) );

		if ( $render ) {
			header( "Content-Disposition: inline" );
		}

		header( 'Cache-Control: must-revalidate' );
		header( 'Pragma: public');
		header( "Pragma: no-cache" );
		header( "Cache-Control: no-cache, no-store, must-revalidate" );
		header( 'Cache-Control: pre-check=0, post-check=0, max-age=0', false );
		header( "Expires: 0" );
		header( 'Content-Length: ' . filesize( $file ) );

		readfile( $file );

		die();
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