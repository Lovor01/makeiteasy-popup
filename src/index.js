/**
 * Popup block
 *
 * @author Lovro Hrust
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Store to handle open state of popups
 */
import './store.js';

/**
 * Sidebar extension to show or hide popups
 */
import './components/plugin-sidebar.jsx';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as icon } from './assets/block-icon.svg';

// deprecations
/* eslint-disable camelcase */
import v1_0 from './deprecated/1.0';
import v1_1 from './deprecated/1.1';
import v1_1_3 from './deprecated/1.1.3';
import v1_1_5 from './deprecated/1.1.5';
/* eslint-enable camelcase */

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
	/* eslint-disable camelcase */
	deprecated: [
		{
			attributes: v1_0.attributes,
			supports: v1_0.supports,
			save: v1_0.save,
		},
		{
			attributes: v1_1.attributes,
			supports: v1_1.supports,
			save: v1_1.save,
		},
		{
			attributes: v1_1_3.attributes,
			supports: v1_1_3.supports,
			save: v1_1_3.save,
		},
		{
			attributes: v1_1_5.attributes,
			supports: v1_1_5.supports,
			save: v1_1_5.save,
		},
	],
	/* eslint-enable camelcase */

	icon,
} );
