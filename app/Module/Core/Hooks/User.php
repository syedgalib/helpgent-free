<?php

namespace WPWaxCustomerSupportApp\Module\Core\Hooks;

use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Core\Model\Guest_User_Model;

class User {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_action( 'user_register', [ $this, 'migrate_guest_to_wp_user' ], 10, 2 );
    }

	/**
     * Remove user from guest table
     *
     * @param array $user_name
     * @param object $user
     * @return bool
     */
	public function migrate_guest_to_wp_user( $user_name, $user ) {

		$user = get_user_by( 'email', $user['user_email'] );

		$is_guest = Guest_User_Model::get_items( [ 'where' => [ 'email' => $user->user_email ] ] );

		if( is_wp_error( $is_guest ) ) {
			return;
		}

		if( empty( $is_guest ) ) {
			return;
		}

		$is_guest = $is_guest[0];

		$metas = Guest_User_Model::get_meta( $is_guest['id'] );
		
		if( ! empty( $metas ) ) {
			foreach( $metas as $index => $meta ) {
				update_user_meta( $user->user_id, '_' . $meta['meta_key'], $meta['meta_value'] );
			}
		}
		if( ! Helper\is_user_admin( $user ) ) {
			$user->add_role( HELPGENT_CLIENT_ROLE );
		}
		Guest_User_Model::delete_item( $is_guest['id'] );
	}

}