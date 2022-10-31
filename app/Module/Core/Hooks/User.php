<?php

namespace WPWaxCustomerSupportApp\Module\Core\Hooks;

use WPWaxCustomerSupportApp\Module\Core\Model\Guest_User_Model;


class User {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_action( 'wp_loginn', [ $this, 'migrate_guest_to_wp_user' ] );
    }

	/**
     * Remove user from guest table
     *
     * @param array $user_name
     * @param object $user
     * @return bool
     */
	public function migrate_guest_to_wp_user( $user_name, $user ) {

		$is_guest = Guest_User_Model::get_item( $user->user_email );
		
		if( is_wp_error( $is_guest ) ) {
			return;
		}

		$metas = Guest_User_Model::get_meta( $is_guest['id'] );
		
		if( ! empty( $metas ) ) {
			foreach( $metas as $index => $meta ) {
				update_user_meta( $user->user_id, '_' . $meta['meta_key'], $meta['meta_value'] );
			}
		}
		$user->remove_role( 'subscriber' );
		$user->add_role( HELPGENT_CLIENT_ROLE );
		Guest_User_Model::delete_item( $is_guest['id'] );
	}

}