import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import {
	default as BlockBody,
	wrapperAttributes,
} from './components/BlockBody.jsx';
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
		closeButtonPosition,
		style: {
			spacing: {
				padding: { top = null, right = null } = {
					top: null,
					right: null,
				},
			} = { padding: { top: null, right: null } },
		} = { spacing: { padding: { top: null, right: null } } },
		popupWidth,
		align,
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

	// set unique id if anchor is not set
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

	// reset popupWidth if align changes
	useEffect( () => {
		if ( align && ! popupWidth ) {
			setAttributes( {
				popupWidth: undefined,
			} );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ align ] );
	// reset align if popupWidth changes
	useEffect( () => {
		if ( popupWidth && ! align ) {
			setAttributes( {
				align: undefined,
			} );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ popupWidth ] );

	return (
		<>
			<BlockSidebar { ...{ attributes, setAttributes, openType } } />
			<BlockBody
				{ ...useBlockProps(
					wrapperAttributes( attributes, popupsOpen, true )
				) }
				isModal={ modalityType === 'modal' }
				innerBlocks={ useInnerBlocksProps }
				anchor={ anchor }
				hasCloseButton={ hasCloseButton }
				closeButtonColor={ closeButtonColor }
				closeButtonPosition={ closeButtonPosition }
				closeTop={ top }
				closeRight={ right }
				popupWidth={ popupWidth }
			/>
		</>
	);
}
