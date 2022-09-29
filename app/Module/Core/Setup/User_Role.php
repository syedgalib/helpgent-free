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
			'read'                    => true,
			'upload_files'            => true,
			'wpwax_vm_create_message' => true,
			'wpwax_vm_read_message'   => true,
			'wpwax_vm_edit_message'   => true,
			'wpwax_vm_delete_message' => true,
		]);

	}


}