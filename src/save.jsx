import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { default as BlockBody, wrapperClass } from './components/BlockBody';

/* eslint-disable camelcase */
export default function save( {
	attributes,
	attributes: {
		// NOTE: save_id was once atribute and was used for the outer shell id.

		anchor,
		hasCloseButton,
		modalityType,
		closeButtonColor,
	},
} ) {
	return (
		<BlockBody
			{ ...useBlockProps.save( wrapperClass( attributes ) ) }
			isModal={ modalityType === 'modal' }
			innerBlocks={ useInnerBlocksProps.save }
			anchor={ anchor }
			hasCloseButton={ hasCloseButton }
			closeButtonColor={ closeButtonColor }
		/>
	);
}
