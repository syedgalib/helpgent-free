<?php

namespace WPWaxCustomerSupportApp\Module\Core\Hooks;

use WPWaxCustomerSupportApp\Module\Core\Model\Auth_Token_Model;

use function WPWaxCustomerSupportApp\Base\Helper\is_current_user_admin;
use function WPWaxCustomerSupportApp\Base\Helper\is_current_user_client;
use function WPWaxCustomerSupportApp\Base\Helper\is_current_user_guest;

class Authentication {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_action( 'init', [ $this, 'integrate_auth_token' ] );
    }

	/**
	 * Integrate Auth Token
	 *
	 * @return void
	 */
	public function integrate_auth_token() {
		$token = ( isset( $_GET['token'] ) ) ? $_GET['token'] : '';

		if ( empty( $token ) ) {
			return;
		}

		$token_email = Auth_Token_Model::get_user_email_by_token( $token );

		if ( empty( $token_email ) ) {
			$GLOBALS['helpgent_has_invalid_token'] = true;
			return;
		}

		$is_valid_token = Auth_Token_Model::is_valid_token( $token_email, $token );

		if ( ! $is_valid_token ) {
			$GLOBALS['helpgent_has_expaired_token'] = true;
			$GLOBALS['helpgent_expaired_token']     = $token;
			return;
		}

		$wp_user = get_user_by( 'email', $token_email );

		if ( ! empty( $wp_user ) ) {
			$GLOBALS['current_user'] = $wp_user;
		} else {
			$GLOBALS['helpgent_guest_user'] = $token_email;
		}

		$GLOBALS['helpgent_token'] = $token;

	}

}