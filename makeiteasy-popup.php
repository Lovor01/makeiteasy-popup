<?php
/**
 * @package           makeiteasy-popup
 * @author               Lovro Hrust <lovro@makeiteasy.hr>
 *
 * Plugin Name:       Makeiteasy Popup block
 * Description:       Popup block solution aligned with block editor concept
 * Requires at least: 6.3
 * Requires PHP:      7.4
 * Version:           0.1.1
 * Author:            Lovro Hrust
 * License:           LGPLv3
 * License URI:       https://www.gnu.org/licenses/lgpl-3.0.html
 * Text Domain:       makeiteasy-popup
 */


function makeiteasy_popup_block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'makeiteasy_popup_block_init' );
