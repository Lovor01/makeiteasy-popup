import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { default as BlockBody, wrapperClass } from './components/BlockBody';

/* eslint-disable camelcase */
export default function save( {
	attributes,
	attributes: {
		anchor,
		hasCloseButton,
		modalityType,
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
	},
} ) {
	return (
		<BlockBody.save
			{ ...useBlockProps.save( wrapperClass( attributes ) ) }
			isModal={ modalityType === 'modal' }
			innerBlocks={ useInnerBlocksProps.save }
			anchor={ anchor }
			hasCloseButton={ hasCloseButton }
			closeButtonColor={ closeButtonColor }
			closeButtonPosition={ closeButtonPosition }
			closeTop={ top }
			closeRight={ right }
			popupWidth={ popupWidth }
		/>
	);
}
