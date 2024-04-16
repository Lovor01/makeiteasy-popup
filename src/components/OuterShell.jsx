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
		return classesString !== '' ? { className: classesString } : null;
	};

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
		<div
			aria-hidden="true"
			{ ...{ ...restProps, className: getClasses( classesWithoutHas ) } }
			ref={ ref }
		>
			<div
				className="makeiteasy-popup-overlay"
				tabIndex="-1"
				{ ...dataModalCloseAttr }
			>
				<div
					role="dialog"
					aria-modal={ isModal }
					aria-labelledby="modal-1-title"
					{ ...classesWithHasString() }
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
