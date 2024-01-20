<?php
/**
 * Plugin Name:       Makeiteasy Popup block
 * Description:       Popup block solution aligned with block editor concept
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.1
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       makeiteasy-popup
 *
 * @package           create-block
 */


function makeiteasy_popup_block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'makeiteasy_popup_block_init' );