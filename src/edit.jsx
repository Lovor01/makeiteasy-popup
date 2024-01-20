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
	attributes: { save_id, openType, hasCloseButton },
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
		if ( idExists( save_id, blocks, clientId ) || ! save_id )
			setAttributes( {
				save_id: customNanoId( blocks, clientId ),
			} );
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );
	return (
		<>
			<BlockSidebar { ...{ attributes, setAttributes, openType } } />
			<OuterShell
				{ ...useBlockProps( wrapperClass( attributes, popupsOpen ) ) }
				innerBlocks={ useInnerBlocksProps }
				save_id={ save_id }
				hasCloseButton={ hasCloseButton }
			/>
		</>
	);
}
