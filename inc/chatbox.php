<?php
/**
 * @author  wpWax
 */

namespace wpWax\vm;

class Chatbox {

	public function __construct() {
		add_action( 'wp_footer', array( $this, 'load_ui' ) );
	}

	public function load_ui() {
		echo '<div id="wpwax-vm-chatbox"></div>';
	}
}
