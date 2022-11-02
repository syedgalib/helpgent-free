<?php

namespace WPWaxCustomerSupportApp\Module\Core\Hooks;

use WP_Error;
use WPWaxCustomerSupportApp\Module\Core\Model\Attachment_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;

use function WPWaxCustomerSupportApp\Base\Helper\is_current_user_admin;
use function WPWaxCustomerSupportApp\Base\Helper\is_current_user_client;
use function WPWaxCustomerSupportApp\Base\Helper\is_current_user_guest;

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
		if ( ! $this->can_user_access_the_attachment( $attachment_id ) ) {
			status_header(403);
			die('You are not allowed to access the file.');
		}

		$matches = [];

		preg_match( '/attachment_.+$/', $attachment[ 'url' ], $matches );

		if ( empty( $matches ) ) {
			status_header(404);
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

		if ( ! current_user_can( 'wpwax_vm_client' ) ) {
			return false;
		}

		// Get the attachment session ID
		$attachment_args = [
			'where' => [
				'field'   => 'attachment_id',
				'compare' => '=',
				'value'   => $attachment_id,
			]
		];

		$attachment_sessions = Message_Model::get_items( $attachment_args );

		if ( empty( $attachment_sessions ) ) {
			return false;
		}

		$attachment_session_id = $attachment_sessions[0]['session_id'];

		// Get all the session ID of the current user
		$user_message_args = [
			'limit' => -1,
			'where' => [
				'field'   => 'user_id',
				'compare' => '=',
				'value'   => get_current_user_id(),
			]
		];

		$user_sessions = Message_Model::get_items( $user_message_args );

		if ( empty( $user_sessions ) ) {
			return false;
		}

		$user_sessions = array_map( function( $message ) { return $message['session_id']; }, $user_sessions );

		// If user sessions includes attachment session ID
		// let user access the file

		if ( in_array( $attachment_session_id, $user_sessions ) ) {
			return true;
		}

		// Otherwise block the access
		return false;
	}

	/**
	 * Is User Authenticated
	 *
	 * @return bool Status
	 */
	public function is_user_authenticated() {

		$is_admin  = is_current_user_admin();
		$is_client = is_current_user_client();
		$is_guest  = is_current_user_guest();

		if ( $is_admin || $is_client || $is_guest ) {
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