import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { default as OuterShell, wrapperClass } from './components/OuterShell';
import { useEffect } from '@wordpress/element';
import BlockSidebar from './components/BlockSidebar';
import { idExists, customNanoId } from './helpers/custom-id.js';
import { useSelect } from '@wordpress/data';
import popupStore from './store';

import './editor.scss';

/* eslint-disable camelcase */
export default function Edit( {
	attributes,
	attributes: { openType, hasCloseButton, anchor },
	setAttributes,
	clientId,
} ) {
	// Get all blocks
	const blocks = useSelect( ( select ) =>
		select( 'core/block-editor' ).getBlocks()
	);
	const popupsOpen = useSelect( ( select ) =>
		select( popupStore ).getPopupsOpen()
	);

	useEffect( () => {
		if ( idExists( anchor, blocks, clientId ) || ! anchor ) {
			// eslint-disable-next-line no-unused-vars
			const customId = customNanoId( blocks, clientId );
			setAttributes( {
				// save_id: customId,
				anchor: customId,
			} );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );
	return (
		<>
			<BlockSidebar { ...{ attributes, setAttributes, openType } } />
			<OuterShell
				{ ...useBlockProps( wrapperClass( attributes, popupsOpen ) ) }
				innerBlocks={ useInnerBlocksProps }
				anchor={ anchor }
				hasCloseButton={ hasCloseButton }
			/>
		</>
	);
}
