<?php

namespace WPWaxCustomerSupportApp\Module\Core\Admin;

class Admin_Notices
{

	public function __construct()
	{
		add_action('wp_loaded', [$this, 'remove_all_notice_actions']);
	}

	public function remove_all_notice_actions()
	{
		if (!isset($_GET['page'])) {
			return;
		}

		if (in_array($_GET['page'], ['video-message', 'vm-forms', 'vm-settings'])) {
			remove_all_actions('admin_notices');
			remove_all_actions('network_admin_notices');
		}
	}
}
