import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import {
	default as BlockBody,
	wrapperAttributes,
} from './components/BlockBody';

/* eslint-disable camelcase */
export default function save( {
	attributes,
	attributes: {
		anchor,
		hasCloseButton,
		modalityType,
		layoutType,
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
		accessibleDialogLabel,
	},
} ) {
	return (
		<BlockBody.save
			{ ...useBlockProps.save( wrapperAttributes( attributes ) ) }
			isModal={ modalityType === 'modal' }
			isFixed={ layoutType === 'fixed' }
			innerBlocks={ useInnerBlocksProps.save }
			anchor={ anchor }
			hasCloseButton={ hasCloseButton }
			closeButtonColor={ closeButtonColor }
			closeButtonPosition={ closeButtonPosition }
			closeTop={ top }
			closeRight={ right }
			popupWidth={ popupWidth }
			accessibleDialogLabel={ accessibleDialogLabel }
		/>
	);
}
