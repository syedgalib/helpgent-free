<?php

namespace HelpGent\Module\Core\Admin\Admin_Menu;

use HelpGent\Helper;
use HelpGent\Module\Messenger\Admin\Admin_Menu as Messenger_Admin_Menu;
use HelpGent\Module\Forms\Admin\Admin_Menu as Forms_Admin_Menu;
use HelpGent\Module\Contacts\Admin\Admin_Menu as Contacts_Admin_Menu;
use HelpGent\Module\Settings_Panel\Admin\Admin_Menu as Settings_Panel_Admin_Menu;

class Init
{

	/**
	 * Constuctor
	 *
	 * @return void
	 */
	public function __construct()
	{

		// Register Controllers
		$controllers = $this->get_controllers();
		Helper\Serve::register_services($controllers);
	}

	/**
	 * Controllers
	 *
	 * @return array
	 */
	protected function get_controllers() {
		return [
			Admin_Menu::class,
			Messenger_Admin_Menu::class,
			Forms_Admin_Menu::class,
			Contacts_Admin_Menu::class,
			Settings_Panel_Admin_Menu::class,
		];
	}
}
