<?php

namespace HelpGent\Module\Messenger\Frontend;
use HelpGent\Base\Helper;
class Chatbox {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_action( 'wp_footer', [$this, 'load_ui'] );

    }

    public function load_ui() {
        $chat_head_position = Helper\get_option( 'chatHeadPosition', 'bottom-right' );
        ?>
            <div id="wpwax-vm-chatbox" class="<?php echo 'wpwax-vm-' . esc_attr( $chat_head_position ); ?>"></div>
        <?php
    }

}