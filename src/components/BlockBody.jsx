/**
 * Popup markup which Micromodal.js requires is delegated
 */

/**
 * TODO: rewrite to use __experimentalSkipSerialization instead of dividing classes
 */

import { ReactComponent as CloseX } from '../assets/close-x.svg';
import { forwardRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';

const BlockBodyInner = ( props ) => {
	const {
		innerBlocks,
		hasCloseButton,
		isModal,
		closeButtonColor,
		dataModalCloseAttr,
		closeTop,
		closeRight,
		...restProps
	} = props;

	const CloseButtonIcon = applyFilters(
		'makeiteasy/popup/closeButtonIconElement',
		CloseX
	);

	const decypherStyle = ( style ) =>
		style?.substring( 0, 4 ) === 'var:'
			? `var(--wp--${ style.substring( 4 ).replaceAll( '|', '--' ) })`
			: style;

	// use style attribute to position close button correctly
	const closeButton = hasCloseButton ? (
		<button
			aria-label="Close modal"
			className="makeiteasy-popup-close"
			{ ...dataModalCloseAttr }
			style={ {
				top: decypherStyle( closeTop ),
				right: decypherStyle( closeRight ),
			} }
		>
			<CloseButtonIcon
				style={ {
					fill: closeButtonColor,
				} }
			/>
		</button>
	) : null;

	return (
		<div
			role="dialog"
			aria-modal={ isModal }
			aria-labelledby="modal-1-title"
			{ ...{
				...restProps,
				className: restProps.className + ' makeiteasy-popup-wrapper',
				...dataModalCloseAttr,
			} }
		>
			<div
				{ ...innerBlocks( {
					className: 'makeiteasy-popup-content-wrapper',
				} ) }
			/>
			{ closeButton }
		</div>
	);
};

const BlockBody = forwardRef( ( props, ref ) => {
	const { innerProps, outerProps } = separateOnOuterAndInner(
		props,
		undefined,
		undefined,
		false
	);

	return (
		<div { ...outerProps } ref={ ref }>
			<BlockBodyInner { ...innerProps } />
		</div>
	);
} );

BlockBody.save = ( props ) => {
	const { innerProps, outerProps, dataModalCloseAttr } =
		separateOnOuterAndInner(
			props,
			undefined,
			'makeiteasy-popup-overlay',
			true
		);

	return (
		<div aria-hidden="true" { ...outerProps }>
			<div
				className="makeiteasy-popup-overlay"
				tabIndex="-1"
				{ ...dataModalCloseAttr }
			>
				<BlockBodyInner { ...innerProps } />
			</div>
		</div>
	);
};

export default BlockBody;

/**
 * Separate on outer and inner props
 * classes with "has-" and align prefix are also separated from the rest
 * add additional class
 * @param {string}  className
 * @param {string}  addToClassesWithHas
 * @param {string}  addToClassesWithoutHas
 * @param {boolean} isSave
 * @return {Object} classesWithHas, classesWithoutHas
 */
const separateOnOuterAndInner = (
	{
		className,
		anchor,
		innerBlocks,
		isModal,
		hasCloseButton,
		closeButtonColor,
		closeTop,
		closeRight,
		style,
		...restProps
	},
	addToClassesWithHas,
	addToClassesWithoutHas,
	isSave
) => {
	const getClassesString = ( classArray ) => {
		const classesString = Array.isArray( classArray )
			? classArray.join( ' ' )
			: classArray;
		return classesString !== '' ? classesString : null;
	};
	/* move has- classes (block editor built-in classes) lower, on popup, while retaining other classes on most outer element
	 * align is moved only in save, not in editor, to properly function */
	const classes = className.split( ' ' );
	const classesWithoutHas = [],
		classesWithHas = [];

	for ( const singleClass of classes ) {
		if (
			singleClass.substring( 0, 4 ) === 'has-' ||
			( isSave && singleClass.substring( 0, 5 ) === 'align' )
		) {
			classesWithHas.push( singleClass );
		} else {
			classesWithoutHas.push( singleClass );
		}
	}
	// add classes to classesWithHas
	if ( addToClassesWithHas ) {
		classesWithHas.push( addToClassesWithHas );
	}
	// add classes to classesWithoutHas
	if ( addToClassesWithoutHas ) {
		classesWithoutHas.push( addToClassesWithoutHas );
	}

	const dataModalCloseAttr = anchor
		? { [ 'data-micromodal-close-' + anchor ]: true }
		: null;

	return {
		dataModalCloseAttr,
		outerProps: {
			...restProps,
			className: getClassesString( classesWithoutHas ),
			'aria-hidden': isModal ? 'true' : null,
		},
		innerProps: {
			className: getClassesString( classesWithHas ),
			innerBlocks,
			hasCloseButton,
			isModal,
			closeButtonColor,
			dataModalCloseAttr,
			style,
			closeTop,
			closeRight,
		},
	};
};

export const wrapperClass = (
	{
		openType,
		layoutType,
		modalityType,
		openSelector,
		openingTime,
		waitingAfterClosing,
		enabled,
		attachedBaseElement,
	},
	// just for editor - class to hide popups (handled with editor plugin and separate store)
	isShown = true,
	// detect if call is from Edit
	isEdit
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
			floating: ! isEdit ? 'popup-floating' : '',
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
	'data-attached-base-element': attachedBaseElement,
} );
