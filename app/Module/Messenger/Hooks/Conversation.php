<?php

namespace HelpGent\Module\Messenger\Hooks;

use HelpGent\Module\Messenger\Model\Conversation_Term_Relationship_Model;
use HelpGent\Base\Helper;
use HelpGent\Module\Messenger\Model\Conversation_Model;

class Conversation {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_action( 'helpgent_after_term_deleted', [ $this, 'remove_conversation_term_relationship' ], 20, 1 );
		add_action( 'helpgent_after_conversation_insert', [ $this, 'migrate_to_client_after_conversation_insert' ], 20, 2 );
		add_action( 'helpgent_after_message_inserted', [ $this, 'mark_conversation_as_unread' ], 20, 2 );
		add_action( 'helpgent_after_term_insert', [ $this, 'add_term_to_conversation' ], 20, 3 );
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
     * Migrate to Client After Conversation Insert
     *
	 * @param array $data
	 * @param array $args
     * @return void
     */
    public function migrate_to_client_after_conversation_insert( $data = [], $args = [] ) {
		$created_by = ( ! empty( $data['created_by'] ) ) ? $data['created_by'] : '';

		if ( empty( $created_by ) ) {
			return;
		}

		Helper\migrate_user_to_client( $created_by );
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
	 * Add Term To Conversation
	 *
	 * @param array $data
	 * @param array $args
	 * @param array $main_args
	 *
	 * @return void
	 */
	function add_term_to_conversation( $data = [], $args = [], $main_args = [] ) {
		$conversation_id = ! empty( $main_args['conversation_id'] ) ? $main_args['conversation_id'] : 0;

		if ( empty( $conversation_id ) ) {
			return;
		}

		Conversation_Model::add_term( $conversation_id, $data['term_id'] );
	}

}