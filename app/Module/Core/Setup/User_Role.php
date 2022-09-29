<?php

namespace WPWaxCustomerSupportApp\Module\Core\Setup;

class User_Role {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

		add_action( 'init', [ $this, 'add_user_role_and_capabilities' ] );

    }

	/**
	 * Add User Role And Capabilities
	 *
	 * @return void
	 */
    public function add_user_role_and_capabilities() {

		add_role( 'wpwax_vm_client', 'Client', [
			// WP Capabilities
			'read'         => true,
			'upload_files' => true,

			// Attachment Capabilities
			'wpwax_vm_read_attachment'   => true,
			'wpwax_vm_read_attachmens'   => false,
			'wpwax_vm_create_attachment' => true,
			'wpwax_vm_edit_attachment'   => false,
			'wpwax_vm_delete_attachment' => false,

			// Message Capabilities
			'wpwax_vm_create_message' => true,
			'wpwax_vm_read_message'   => true,
			'wpwax_vm_read_messages'  => true,
			'wpwax_vm_edit_message'   => true,
			'wpwax_vm_delete_message' => true,

			'wpwax_vm_create_other_message' => false,
			'wpwax_vm_read_other_message'   => false,
			'wpwax_vm_read_other_messages'  => false,
			'wpwax_vm_edit_other_message'   => false,
			'wpwax_vm_delete_other_message' => false,

			// Session Capabilities
			'wpwax_vm_read_session'           => true,
			'wpwax_vm_read_sessions'          => true,
			'wpwax_vm_delete_session'         => true,
			'wpwax_vm_mark_as_read_session'   => true,
			'wpwax_vm_mark_as_unread_session' => true,

			'wpwax_vm_read_other_session'           => false,
			'wpwax_vm_read_other_sessions'          => false,
			'wpwax_vm_delete_other_session'         => false,
			'wpwax_vm_mark_as_read_other_session'   => false,
			'wpwax_vm_mark_as_unread_other_session' => false,

			'wpwax_vm_assign_terms_to_session'     => false,
			'wpwax_vm_unassign_terms_from_session' => false,

			// Terms Capabilities
			'wpwax_vm_read_session_term'   => true,
			'wpwax_vm_read_session_terms'  => true,
			'wpwax_vm_create_session_term' => false,
			'wpwax_vm_edit_session_term'   => false,
			'wpwax_vm_delete_session_term' => false,

			// Chatbox Forms Capabilities
			'wpwax_vm_read_chatbox_form'   => true,
			'wpwax_vm_read_chatbox_forms'  => true,
			'wpwax_vm_create_chatbox_form' => false,
			'wpwax_vm_edit_chatbox_form'   => false,
			'wpwax_vm_delete_chatbox_form' => false,
		]);

	}


}