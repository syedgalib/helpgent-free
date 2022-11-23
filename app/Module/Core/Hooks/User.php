<?php

namespace HelpGent\Module\Core\Hooks;

use HelpGent\Base\Helper;
use HelpGent\Module\Core\Model\Guest_User_Model;

class User {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_action( 'user_register', [ $this, 'migrate_guest_to_client' ], 10, 2 );
    }

	/**
     * Guest User Migration
     *
     * @param array $user_name
     * @param object $user
     * @return bool
     */
	public function migrate_guest_to_client( $user_name, $user ) {
		$user        = get_user_by( 'email', $user['user_email'] );
		$guest_users = Guest_User_Model::get_items( [ 'where' => [ 'email' => $user->user_email ] ] );

		if ( empty( $guest_users ) ) {
			return;
		}

		$guest = $guest_users[0];
		$metas = Guest_User_Model::get_meta( $guest['id'] );

		if ( ! empty( $metas ) ) {
			foreach( $metas as $index => $meta ) {
				update_user_meta( $user->user_id, HELPGENT_META_PREFIX . $meta['meta_key'], $meta['meta_value'] );
			}
		}

		Guest_User_Model::delete_item( $guest['id'] );

		Helper\migrate_user_to_client( $user->user_email );
	}

}