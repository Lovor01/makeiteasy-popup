<?php
/**
 * Plugin Name:       Makeiteasy Popup
 * Description:       Popup block solution aligned with block editor concept
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Version:           1.2.0
 * Author:            Lovro Hrust
 * License:           LGPLv3
 * License URI:       https://www.gnu.org/licenses/lgpl-3.0.html
 * Text Domain:       makeiteasy-popup
 *
 * @package           makeiteasy-popup
 * @author            Lovro Hrust <lovro@makeiteasy.hr>
 */

namespace Makeiteasy\Popup;

require __DIR__ . '/auxiliary.php';

function makeiteasy_popup_block_init() {
	\register_block_type( __DIR__ . '/build' );
	\wp_set_script_translations( 'makeiteasy-popup-editor-script', 'makeiteasy-popup', plugin_dir_path( __FILE__ ) . 'languages' );
}

add_action( 'init', 'Makeiteasy\Popup\makeiteasy_popup_block_init' );
