import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { default as BlockBody, wrapperClass } from './components/BlockBody.jsx';
import { useEffect } from '@wordpress/element';
import BlockSidebar from './components/BlockSidebar';
import { idExists, customNanoId } from './helpers/custom-id.js';
import { useSelect } from '@wordpress/data';
import popupStore from './store';

import './editor.scss';

export default function Edit( {
	attributes,
	attributes: {
		openType,
		hasCloseButton,
		anchor,
		closeButtonColor,
		style: {
			spacing: {
				padding: { top, right },
			},
		} = { spacing: { padding: { top: undefined, right: undefined } } },
	},
	setAttributes,
	clientId,
	modalityType,
} ) {
	// Get all blocks
	const blocks = useSelect( ( select ) =>
		select( 'core/block-editor' ).getBlocks()
	);
	const popupsOpen = useSelect( ( select ) =>
		select( popupStore ).getPopupsOpen()
	);

	useEffect( () => {
		if ( ! anchor || idExists( anchor, blocks, clientId ) ) {
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
			<BlockBody
				{ ...useBlockProps(
					wrapperClass( attributes, popupsOpen, true )
				) }
				isModal={ modalityType === 'modal' }
				innerBlocks={ useInnerBlocksProps }
				anchor={ anchor }
				hasCloseButton={ hasCloseButton }
				closeButtonColor={ closeButtonColor }
				closeTop={ top }
				closeRight={ right }
			/>
		</>
	);
}
