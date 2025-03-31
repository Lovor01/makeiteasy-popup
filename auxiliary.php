<?php
/**
 * Auxiliary functions
 * hides block if it is not enabled
 *
 * @author Lovro Hrust
 */
namespace Makeiteasy\Popup;

add_filter( 'render_block_makeiteasy/popup', '\Makeiteasy\Popup\hide_block', 10, 2 );

function hide_block( $block_content, $block ) {
	if ( isset( $block['attrs']['enabled'] ) && $block['attrs']['enabled'] == false ) {
		return '';
	}
	return $block_content;
}
