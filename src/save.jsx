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
		style: {
			spacing: {
				padding: { top, bottom },
			},
		} = { spacing: { padding: { top: undefined, bottom: undefined } } },
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
			closeTop={ top }
			closeRight={ bottom }
		/>
	);
}
