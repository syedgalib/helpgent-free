<?php

namespace WPWaxCustomerSupportApp\Module\Messenger\Hooks;

use WPWaxCustomerSupportApp\Module\Messenger\Model\Conversation_Term_Relationship_Model;
use WPWaxCustomerSupportApp\Base\Helper;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Conversation_Model;
use WPWaxCustomerSupportApp\Module\Messenger\Model\Message_Model;

class Conversation {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_action( 'helpgent_after_term_deleted', [ $this, 'remove_conversation_term_relationship' ], 20, 1 );
		add_action( 'helpgent_after_message_inserted', [ $this, 'mark_conversation_as_unread' ], 20, 2 );
		add_action( 'helpgent_after_message_inserted', [ $this, 'update_conversation_meta' ], 20, 2 );
		// add_action( 'helpgent_after_message_inserted', [ $this, 'migrate_user' ], 20, 2 );
    }

    /**
     * Remove Conversation Term Relationship
     *
	 * @param array
     * @return void
     */
    public function remove_conversation_term_relationship( $term = [] ) {
		Conversation_Term_Relationship_Model::delete_item_where([ 'term_taxonomy_id' => $term['term_taxonomy_id'] ]);
    }

    /**
     * Mark conversation as unread
	 *
	 * If author is client mark the conversation as unread
     *
	 * @param array $message
	 * @param array $args
     * @return void
     */
    public function mark_conversation_as_unread( $message = [], $args = [] ) {

		$user_email = ( ! empty( $message['user_email'] ) ) ? $message['user_email'] : [];

		if ( empty( $user_email ) ) {
			return;
		}

		$is_user_admin = Helper\is_user_admin( $user_email );

		if ( ! $is_user_admin ) {
			return;
		}

		Conversation_Model::update_meta( $message['conversation_id'], 'read', 0 );
    }

    /**
     * Update Conversation Meta
	 *
     *
	 * @param array $message
	 * @param array $args
     * @return void
     */
    public function update_conversation_meta( $message = [], $args = [] ) {
		// Update First and Last Message ID
		$conversation_id = $message['conversation_id'];

		$messages = Message_Model::get_items([
			'where' => [
				'conversation_id' => $conversation_id,
			]
		]);

		if ( count( $messages ) === 1 ) {
			Conversation_Model::update_meta( $conversation_id, 'first_message_id', $message['id'] );
			Conversation_Model::update_meta( $conversation_id, 'last_message_id', $message['id'] );
		} else {
			Conversation_Model::update_meta( $conversation_id, 'last_message_id', $message['id'] );
		}

    }

    /**
     * Migrate User
	 *
     *
	 * @param array $message
	 * @param array $args
     * @return void
     */
    public function migrate_user( $message = [], $args = [] ) {

		if ( Helper\is_current_user_admin() ) {
			return;
		}

		if ( Helper\is_current_user_client() ) {
			return;
		}

		$email = Helper\get_current_user_email();

		if ( ! empty( $email ) ) {
			return;
		}


    }

}