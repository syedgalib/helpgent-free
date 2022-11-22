<?php

namespace HelpGent\Module\Core\Hooks;

use HelpGent\Module\Core\Model\Attachment_Model;
use HelpGent\Module\Messenger\Model\Message_Model;

use HelpGent\Base\Helper;

class Attachment {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_filter( 'upload_mimes', [ $this, 'add_additional_mimes_support' ], 20, 1 );
		add_action( 'admin_post_dynamic_attachment_link', [ $this, 'dynamic_attachment_link' ] );
    }

	/**
	 * Dynamic Attachment Link
	 *
	 * @return void
	 */
	public function dynamic_attachment_link() {

		if ( ! Helper\is_user_authenticated() ) {
			status_header(403);
			die('You are not allowed to access the file.');
		}

		$attachment_id = ( ! empty( $_GET['attachment_id'] ) && is_numeric( $_GET['attachment_id'] ) ) ? ( int ) $_GET['attachment_id'] : 0;

		if ( empty( $attachment_id ) ) {
			status_header( 404 );
			die('File not found.');
		}

		$attachment = Attachment_Model::get_item( $attachment_id );

		if ( is_wp_error( $attachment ) ) {
			status_header( 403 );
			die( esc_html( $attachment->get_error_message() ) );
		}

		if ( ! $this->can_user_access_the_attachment( $attachment_id ) ) {
			status_header( 403 );
			die('You are not allowed to access the file.');
		}

		$matches = [];

		preg_match( '/attachment_.+$/', $attachment[ 'url' ], $matches );

		if ( empty( $matches ) ) {
			status_header( 404 );
			die('File not found.');
		}

		$file_name = $matches[0];
		$file      = HELPGENT_UPLOAD_DIR_PATH . '/' . $file_name;

		if ( file_exists( $file ) ) {
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
	 * Can User Access The Attachment
	 *
	 * @param int $attachment_id
	 * @return bool Status
	 */
	public function can_user_access_the_attachment( $attachment_id = 0 ) {

		if ( current_user_can( 'administrator' ) ) {
			return true;
		}

		// Get the attachment session ID
		$attachment_args = [
			'where' => [
				'field'   => 'attachment_id',
				'compare' => '=',
				'value'   => $attachment_id,
			],
			'limit' => 1,
		];

		$attachment_messeges = Message_Model::get_items( $attachment_args );

		if ( empty( $attachment_messeges['results'] ) ) {
			return false;
		}

		$attachment_conversation_id = $attachment_messeges['results'][0]['conversation_id'];

		return Helper\current_user_can_view_conversation( $attachment_conversation_id );
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