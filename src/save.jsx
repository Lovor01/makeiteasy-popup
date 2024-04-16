import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { default as OuterShell, wrapperClass } from './components/OuterShell';

/* eslint-disable camelcase */
export default function save( {
	attributes,
	attributes: {
		// NOTE: save_id was once atribute and was used for the outer shell id.

		anchor,
		hasCloseButton,
		modalityType,
	},
} ) {
	return (
		<OuterShell
			{ ...useBlockProps.save( wrapperClass( attributes ) ) }
			isModal={ modalityType === 'modal' }
			innerBlocks={ useInnerBlocksProps.save }
			anchor={ anchor }
			hasCloseButton={ hasCloseButton }
		/>
	);
}
