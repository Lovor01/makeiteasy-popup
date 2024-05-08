/**
 * Popup markup which Micromodal.js requires is delegated
 */

/**
 * TODO: rewrite to use __experimentalSkipSerialization instead of dividing classes
 */

import { ReactComponent as CloseX } from '../assets/close-x.svg';
import { forwardRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

const BlockBody = forwardRef( ( props, ref ) => {
	const {
		innerBlocks,
		hasCloseButton = true,
		isModal,
		closeButtonColor,
		dataModalCloseAttr,
		...restProps
	} = props;

	const CloseButtonIcon = applyFilters(
		'makeiteasy/popup/closeButtonIconElement',
		CloseX
	);

	const closeButton = hasCloseButton ? (
		<button
			aria-label="Close modal"
			className="makeiteasy-popup-close"
			{ ...dataModalCloseAttr }
		>
			<CloseButtonIcon style={ { fill: closeButtonColor } } />
		</button>
	) : null;

	return (
		<div
			role="dialog"
			aria-modal={ isModal }
			aria-labelledby="modal-1-title"
			{ ...restProps }
			ref={ ref }
		>
			<div
				{ ...innerBlocks( {
					className: 'makeiteasy-popup-content-wrapper',
				} ) }
			/>
			{ closeButton }
		</div>
	);
} );

BlockBody.save = ( props ) => {
	const { anchor, ...restProps } = props;
	/* move has- classses (block editor built-in classes) lower, on popup, while retaining the other stuff on most outer element */
	// pick has- properties from classes
	const classes = restProps.className.split( ' ' );
	const classesWithoutHas = [],
		classesWithHas = [];

	for ( const singleClass of classes ) {
		if (
			singleClass.substring( 0, 4 ) === 'has-' ||
			singleClass.substring( 0, 5 ) === 'align'
		)
			classesWithHas.push( singleClass );
		else classesWithoutHas.push( singleClass );
	}

	const getClasses = ( classArray ) =>
		Array.isArray( classArray ) ? classArray.join( ' ' ) : classArray;

	const classesWithHasString = () => {
		// add class to wrapper
		classesWithHas.push( 'makeiteasy-popup-wrapper' );
		const classesString = getClasses( classesWithHas );
		return classesString !== '' ? classesString : null;
	};

	const dataModalCloseAttr = anchor
		? { [ 'data-micromodal-close-' + anchor ]: true }
		: null;

	return (
		<div
			aria-hidden="true"
			{ ...{ ...restProps, className: getClasses( classesWithoutHas ) } }
		>
			<div
				className="makeiteasy-popup-overlay"
				tabIndex="-1"
				{ ...dataModalCloseAttr }
			>
				<BlockBody
					{ ...{
						...restProps,
						dataModalCloseAttr,
						className: classesWithHasString(),
					} }
				/>
			</div>
		</div>
	);
};

export default BlockBody;

export const wrapperClass = (
	{
		openType,
		layoutType,
		modalityType,
		openSelector,
		openingTime,
		waitingAfterClosing,
		enabled,
	},
	// just for editor - class to hide popups (handled with editor plugin and separate store)
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
			fixed: 'popup-floating popup-fixed',
			attached: 'popup-attached',
		}[ layoutType ] +
		' ' +
		{
			modal: 'popup-modal',
			modeless: 'popup-modeless',
		}[ modalityType ] +
		( isShown ? '' : ' is-hidden' ) +
		( enabled ? '' : ' disabled' ),
	// id: save_id, - deprecated
	'data-open-selector': openSelector,
	'data-opening-time': openingTime,
	'data-waiting-after-closing': waitingAfterClosing,
} );
