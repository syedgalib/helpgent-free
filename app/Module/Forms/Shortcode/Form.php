<?php

namespace HelpGent\Module\Forms\Shortcode;

class Form {

    /**
     * Constuctor
     *
     * @return void
     */
    public function __construct() {

        add_shortcode( 'helpgent_form', [ $this, 'render' ] );

    }

    public function render( $atts = [] ) {

		$id = ( is_array( $atts ) && ! empty( $atts['id'] ) ) ? $atts['id'] : 0;

        return '<div id="helpgent-form" data-id="'. $id .'" class="wpwax-vm-app-container-full"></div>';
    }

}