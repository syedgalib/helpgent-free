<?php

namespace HelpGent\Module\Forms\Setup;

use HelpGent\Module\Forms\Database\Prepare_Database;
use HelpGent\Module\Forms\Model\Form_Model;

class Activation {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'helpgent_on_activation', [ $this, 'activatation_tasks' ] );

    }

	/**
	 * Activatation Tasks
	 *
	 * @return void
	 */
    public function activatation_tasks() {

		// Prepare Database
		new Prepare_Database();

		// Create Form
		$this->create_form();

	}

	/**
	 * Create a dummy form.
	 *
	 * @return void
	 */
	protected function create_form() {
		$form_name = 'HelpGent Demo Form';

		if ( Form_Model::name_exists($form_name) || get_option('helpgent_installation_time') ) {
			return;
		}

		$options = [
			'theme'       => 'theme-1',
			'collectInfo' => [ 'phone' ],
			'greet_image_url'          => '',
			'greet_video_url'          => '',
			'greet_message'            => 'Hello there! 👋',
			'greet_message_font_color' => '#ffffff',
			'greet_message_font_size'  => '1.3',
			'show_description'         => true,
			'description'              => 'Please leave your questions below',
			'chat_options_title'       => 'How would you like to contact?',
			'can_replay_in'            => [ 'video', 'voice', 'text' ],
			'show_footer'                      => true,
			'footer_message'                   => 'You can review it before sending',
			'thank_page_title'                 => 'Thank You 💐',
			'show_thank_page_description'      => true,
			'thank_page_description'           => 'Your message has been send successfully. You will receive a reply soon.',
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


}