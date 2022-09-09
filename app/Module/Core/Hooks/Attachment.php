<?php

namespace WPWaxCustomerSupportApp\Module\Core\Hooks;

class Attachment {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {
		add_filter( 'upload_mimes', [ $this, 'add_additional_mimes_support' ] );
    }

    /**
     * Add Additional Mimes Support
     *
	 * @param array $mime_types
     * @return array
     */
    public function add_additional_mimes_support( $mime_types = [] ) {

		$mime_types['webm'] = 'video/webm';

		return $mime_types;

    }

}