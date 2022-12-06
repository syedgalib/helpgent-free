<?php

namespace HelpGent\Module\Settings_Panel\Model;

class Settings_Model {

	/**
	 * Get Default Options
	 *
	 * @return array $options
	 */
	public static function get_default_options() {
		$options = [
			'guestSubmission'              => true,
			'chatHeadPosition'             => 'bottom-right',
			'userDashboardPage'            => '',
			'maxVideoLength'               => 2,
			'maxVoiceLength'               => 2,
			'videoQuality'                 => 720,
			'attatchmentDeletionAfter'     => 20,
			'maxUploadSize'                => 300,
			'enableEmailNotification'      => true,
			'adminEmailNotificationType'   => 'single',
			'userEmailNotificationType'    => 'single',
			'enableEmailHeader'            => true,
			'emailHeaderColor'             => '#000000',
			'emailTemplateFromName'        => '',
			'emailTemplateFromEmail'       => '',
			'emailTemplateGreetingSubject' => '',
			'emailTemplateGreetingBody'    => '',
			'emailTemplateMessageSubject'  => '',
			'emailTemplateMessageBody'     => '',
			'enableEmailFooter'            => true,
			'helpgent_license'             => '',
		];

		$options = apply_filters( 'helpgent_default_settings', $options );

		return $options;
	}

	/**
	 * Get Secret Option Keys
	 *
	 * @return array Secret Option Keys
	 */
	public static function get_secret_option_keys() {

		return [ 'helpgent_license' ];

	}

}