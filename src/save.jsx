import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { default as OuterShell, wrapperClass } from './components/OuterShell';

/* eslint-disable camelcase */
export default function save( {
	attributes,
	attributes: {
		// NOTE: save_id was once atribute and was used for the outer shell id.

		anchor,
		hasCloseButton,
		openSelector,
		openingTime,
		waitingTimeAfterClosing,
	},
} ) {
	return (
		<OuterShell
			{ ...useBlockProps.save( {
				...wrapperClass( attributes ),
				// id: save_id, - deprecated
				'data-open-selector': openSelector,
				'data-opening-time': openingTime,
				'data-waiting-time-after-closing': waitingTimeAfterClosing,
			} ) }
			innerBlocks={ useInnerBlocksProps.save }
			anchor={ anchor }
			hasCloseButton={ hasCloseButton }
		/>
	);
}
