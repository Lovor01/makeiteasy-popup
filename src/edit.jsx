/**
 * for more concise code, uses three components:
 * BlockBody creates content of block
 * BlockToolbar creates toolbar ** not used currently
 * BlockSidebar creates sidebar
 */
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
		accessibleDialogLabel,
	},
	setAttributes,
	clientId,
	modalityType,
	layoutType,
} ) {
	// Get all blocks
	const blocks = useSelect( ( select ) =>
		select( 'core/block-editor' ).getBlocks()
	);
	const popupsOpen = useSelect( ( select ) =>
		select( popupStore ).getPopupsOpen()
	);

	/**
	 * Use useEffect-s here to do various stuff not possible with events
	 */

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

	// reset popupWidth if align changes - I have no possibility to hook in align setting event, so this is placed in useEffect
	// popupWidth changes are handled in event
	useEffect( () => {
		if ( align && popupWidth ) {
			setAttributes( {
				popupWidth: undefined,
			} );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ align ] );

	// if open type is 'on hover' set modality to modeless - avoid any possibility of modalityType being modal while on hover is opening type
	useEffect( () => {
		if ( openType === 'on hover' && modalityType === 'modal' ) {
			setAttributes( {
				modalityType: 'modeless',
			} );
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	return (
		<>
			<BlockSidebar { ...{ attributes, setAttributes, openType } } />
			<BlockBody
				{ ...useBlockProps(
					wrapperAttributes( attributes, popupsOpen, true )
				) }
				isModal={ modalityType === 'modal' }
				isFixed={ layoutType === 'fixed' }
				innerBlocks={ useInnerBlocksProps }
				anchor={ anchor }
				hasCloseButton={ hasCloseButton }
				closeButtonColor={ closeButtonColor }
				closeButtonPosition={ closeButtonPosition }
				closeTop={ top }
				closeRight={ right }
				popupWidth={ popupWidth }
				accessibleDialogLabel={ accessibleDialogLabel }
			/>
		</>
	);
}
