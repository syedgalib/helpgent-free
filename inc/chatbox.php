<?php
/**
 * @author  wpWax
 * @since   1.0
 * @version 1.0
 */

namespace wpWax\vm;

class Chatbox {

	public static function init() {
		add_action( 'wp_footer', array( __CLASS__, 'load_ui' ) );
	}

	public static function load_ui() {
		echo '<div id="wpwax-vm-chatbox"></div>';
	}
}