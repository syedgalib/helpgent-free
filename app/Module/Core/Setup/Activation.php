<?php

namespace HelpGent\Module\Core\Setup;

use HelpGent\Module\Core\Database\Prepare_Database;
use HelpGent\Base\Helper;
use HelpGent\Module\Forms\Model\Form_Model;

class Activation
{

	/**
	 * Constuctor
	 *
	 * @return void
	 */
	public function __construct()
	{

		if (!is_admin()) {
			return;
		}

		register_activation_hook(HELPGENT_FILE, [$this, 'activatation_tasks']);
	}

	/**
	 * Activatation Tasks
	 *
	 * @return void
	 */
	public function activatation_tasks()
	{
		// Prepare Database
		new Prepare_Database();

		do_action( 'helpgent_on_activation' );

		// Prepare Attachment Folder
		$this->prepare_attachment_folder();

		// Create required page
		$this->create_page();

		$this->create_form();

		// Make sure to save installation time at the end.
		// Otherwise create_form won't work.
		$this->save_installation_time();
	}

	/**
	 * Create user dashboard page for all messages
	 *
	 * @return void
	 */
	public function create_page()
	{

		$user_dashboard = Helper\get_option('userDashboardPage');

		if ($user_dashboard) {
			return;
		}

		$page_id = wp_insert_post(
			[
				'post_title'     => 'All Messages',
				'post_content'   => '[helpgent_messages]',
				'post_status'    => 'publish',
				'post_type'      => 'page',
				'comment_status' => 'closed',
			]
		);

		if (!is_wp_error($page_id)) {
			Helper\update_option('userDashboardPage', $page_id);
		}
	}

	/**
	 * Prepare Attachment Folder
	 *
	 * @return void
	 */
	public function prepare_attachment_folder()
	{

		// Create Upload Directory
		wp_mkdir_p(HELPGENT_UPLOAD_DIR_PATH);

		// Create htaccess file
		$fh = fopen(HELPGENT_UPLOAD_DIR_PATH . "/.htaccess", "w");

		if ($fh == false) {
			return;
		}

		fputs($fh, 'Deny from all');
		fclose($fh);
	}

	/**
	 * Create a dummy form.
	 *
	 * @return void
	 */
	protected function create_form()
	{
		$form_name = 'HelpGent Demo Form';

		if (Form_Model::name_exists($form_name) || get_option('helpgent_installation_time')) {
			return;
		}

		$options = [
			'theme'       => 'theme-1',
			'collectInfo' => [
				  'phone' 
			   ], 
			'greet_image_url'          => '',
			'greet_video_url'          => '',
			'greet_message'            => 'Welcome to HelpGent, leave your questions below',
			'greet_message_font_color' => '#ffffff',
			'greet_message_font_size'  => '1.3',
			'show_description'         => true,
			'description'              => 'Welcome to HelpGent, leave your questions below',
			'chat_options_title'       => 'How would you like to chat?',
			'can_replay_in'            => [
					 'video', 
					 'voice', 
					 'text', 
					 'screen_record' 
				  ], 
			'show_footer'                      => true,
			'footer_message'                   => 'You can practice before sending',
			'thank_page_title'                 => 'Thank You',
			'show_thank_page_description'      => false,
			'thank_page_description'           => '',
			'show_thank_page_cta_button'       => false,
			'thank_page_cta_button_text'       => '',
			'thank_page_cta_button_url'        => 'https://wpwax.com/',
			'thank_page_background_color'      => '#ffffff',
			'thank_page_title_color'           => '#000000',
			'thank_page_title_font_size'       => '2',
			'thank_page_description_font_size' => '1',
			'thank_page_description_color'     => '#000000',
			'play_btn_background'              => '#ffffff',
			'page_background_color'            => '#ffffff',
			'page_header_background_color'     => '#6551f2',
			'thank_page_cta_font_color'        => '#23030308',
			'thank_page_cta_button_color'      => '#236551F2',
			'thank_page_cta_button_text_color' => '#23ffffff',
			'thank_page_cta_button_radius'     => '10',
			'font_family'                      => 'Inter',
			'font_color'                       => '#23ffffff',
			'button_color'                     => '#6551f2',
			'button_border_radius'             => '10',
			'chat_options_title_font_size'     => '1',
			'chat_options_title_font_color'    => '#ffffff',
			'footer_message_font_size'         => '.80',
			'footer_message_color'             => '#ffffff',
			'primary_button_font_color'        => '#ffffff',
			'primary_button_background_color'  => '#6551f2'
		];

		Form_Model::create_item([
			'name'    => $form_name,
			'status'  => 'draft',
			'options' => json_encode($options),
		]);
	}

	/**
	 * Store installation time db for future reference.
	 *
	 * @return void
	 */
	protected function save_installation_time()
	{
		if (!get_option('helpgent_installation_time')) {
			update_option('helpgent_installation_time', time(), 'no');
		}
	}
}
