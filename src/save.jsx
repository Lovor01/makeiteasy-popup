import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { default as BlockBody, wrapperClass } from './components/BlockBody';

/* eslint-disable camelcase */
export default function save( {
	attributes,
	attributes: { anchor, hasCloseButton, modalityType, closeButtonColor },
} ) {
	return (
		<BlockBody.save
			{ ...useBlockProps.save( wrapperClass( attributes ) ) }
			isModal={ modalityType === 'modal' }
			innerBlocks={ useInnerBlocksProps.save }
			anchor={ anchor }
			hasCloseButton={ hasCloseButton }
			closeButtonColor={ closeButtonColor }
		/>
	);
}
