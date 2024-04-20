/**
 * Popup markup which Micromodal.js requires is delegated
 */

/* eslint-disable camelcase */
import { ReactComponent as CloseX } from '../assets/close-x.svg';
import { forwardRef } from '@wordpress/element';

export default forwardRef( ( props, ref ) => {
	const {
		innerBlocks,
		anchor,
		hasCloseButton = true,
		isModal,
		...restProps
	} = props;

	const dataModalCloseAttr = anchor
		? { [ 'data-micromodal-close-' + anchor ]: true }
		: null;

	const closeButton = hasCloseButton ? (
		<button
			aria-label="Close modal"
			className="makeiteasy-popup-close"
			{ ...dataModalCloseAttr }
		>
			<CloseX />
		</button>
	) : null;

	return (
		<div aria-hidden="true" { ...{ ...restProps, anchor } } ref={ ref }>
			<div
				className="makeiteasy-popup-overlay"
				tabIndex="-1"
				{ ...dataModalCloseAttr }
			>
				<div
					role="dialog"
					aria-modal={ isModal }
					aria-labelledby="modal-1-title"
					className="makeiteasy-popup-wrapper"
				>
					<div
						{ ...innerBlocks( {
							className: 'makeiteasy-popup-content-wrapper',
						} ) }
					></div>
					{ closeButton }
				</div>
			</div>
		</div>
	);
} );

export const wrapperClass = (
	{
		openType,
		layoutType,
		modalityType,
		openSelector,
		openingTime,
		waitingAfterClosing,
	},
	// just for editor - class to hide popups
	isShown = true
) => ( {
	className:
		{
			'on timer': 'open-on-timer',
			'on scroll': 'open-on-scroll',
			'on click': 'open-on-click',
			'on hover': 'open-on-hover',
		}[ openType ] +
		' ' +
		{
			floating: 'popup-floating',
			static: 'popup-static',
			attached: 'popup-attached',
		}[ layoutType ] +
		' ' +
		{
			modal: 'popup-modal',
			modeless: 'popup-modeless',
		}[ modalityType ] +
		' ' +
		( isShown ? '' : ' is-hidden' ),
	// id: save_id, - deprecated
	'data-open-selector': openSelector,
	'data-opening-time': openingTime,
	'data-waiting-after-closing': waitingAfterClosing,
} );
