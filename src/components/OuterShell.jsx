/* eslint-disable camelcase */
import { ReactComponent as CloseX } from '../assets/close-x.svg';
import { forwardRef } from '@wordpress/element';

export default forwardRef( ( props, ref ) => {
	const { innerBlocks, save_id, hasCloseButton = true, ...restProps } = props;

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

	const dataModalCloseAttr = { [ 'data-micromodal-close-' + save_id ]: true };

	const closeButton = hasCloseButton ? (
		<button
			aria-label="Close modal"
			className="makeiteasy-popup-close"
			{ ...dataModalCloseAttr }
		>
			<CloseX { ...dataModalCloseAttr } />
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
					aria-modal="true"
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
	{ openType, layoutType, modalityType, position },
	// just for editor - class to hide popups
	isShown = true
) => ( {
	className:
		{
			'on timer': 'open-on-timer',
			'on scroll': 'open-on-scroll',
			'on click': 'open-on-click',
			custom: 'open-custom',
		}[ openType ] +
		' ' +
		{
			floating: 'popup-floating',
			fixed: 'popup-fixed',
		}[ layoutType ] +
		' ' +
		{
			modal: 'popup-modal',
			modeless: 'popup-modeless',
		}[ modalityType ] +
		' ' +
		{
			central: 'popup-position-central',
			aside: 'popup-position-aside',
			relative: 'popup-position-relative',
		}[ position ] +
		( isShown ? '' : ' is-hidden' ),
} );
