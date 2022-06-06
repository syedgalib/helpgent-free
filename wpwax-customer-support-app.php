<?php
/**
 * WPWaxCustomerSupportApp
 *
 * @package           WPWaxCustomerSupportApp
 * @author            wpWax
 * @copyright         2022 wpWax
 * @license           GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       WPWax Customer Support App
 * Plugin URI:        https://github.com/sovware/wpwax-video-message
 * Description:       A customer support app
 * Version:           0.1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            wpWax
 * Author URI:        https://github.com/syedgalib
 * Text Domain:       wpwax-customer-support-app
 * License:           GPL v2 or later
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Update URI:        https://github.com/sovware/wpwax-video-message
 */

require dirname( __FILE__ ) . '/vendor/autoload.php';
require dirname( __FILE__ ) . '/app.php';

if ( ! function_exists( 'WPWaxCustomerSupportApp' ) ) {
    function WPWaxCustomerSupportApp() {
        return WPWaxCustomerSupportApp::get_instance();
    }
}

WPWaxCustomerSupportApp();

