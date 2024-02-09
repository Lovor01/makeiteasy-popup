import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { default as OuterShell, wrapperClass } from './components/OuterShell';

/* eslint-disable camelcase */
export default function save( {
	attributes,
	attributes: { save_id, openSelector, hasCloseButton, openingTime },
} ) {
	return (
		<OuterShell
			{ ...useBlockProps.save( {
				...wrapperClass( attributes ),
				id: save_id,
				'data-open-selector': openSelector,
				'data-opening-time': openingTime,
			} ) }
			innerBlocks={ useInnerBlocksProps.save }
			save_id={ save_id }
			hasCloseButton={ hasCloseButton }
		/>
	);
}
