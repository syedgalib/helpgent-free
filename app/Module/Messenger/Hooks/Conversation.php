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
		add_action( 'helpgent_after_message_deleted', [ $this, 'update_last_message_id' ], 20, 1 );
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
	 * If the author is client mark the conversation as unread for admin
	 * If the author is admin mark the conversation as unread for client
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

		$is_author_admin = Helper\is_user_admin( $user_email );

		if ( $is_author_admin  ) {
			Conversation_Model::update_meta( $message['conversation_id'], 'client_read', 0 );
			return;
		}

		Conversation_Model::update_meta( $message['conversation_id'], 'admin_read', 0 );
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

		$messages = $messages['results'];

		if ( count( $messages ) === 1 ) {
			Conversation_Model::update_meta( $conversation_id, 'first_message_id', $message['id'] );
			Conversation_Model::update_meta( $conversation_id, 'last_message_id', $message['id'] );
		} else {
			Conversation_Model::update_meta( $conversation_id, 'last_message_id', $message['id'] );
		}

    }

    /**
     * Update last message ID
	 *
     *
	 * @param array $message
     * @return void
     */
    public function update_last_message_id( $message = [] ) {
		$conversation_id = $message['conversation_id'];

		$messages = Message_Model::get_items([
			'where' => [ 'conversation_id' => $conversation_id ]
		]);

		if ( empty( $messages ) ) {
			Conversation_Model::delete_meta( 'last_message_id' );
			return;
		}

		Conversation_Model::update_meta( $messages[0]['id'] );
    }

}