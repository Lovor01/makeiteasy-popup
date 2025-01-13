/**
 * Popup markup which Micromodal.js requires is delegated
 */

/**
 * TODO: rewrite to use __experimentalSkipSerialization instead of dividing classes
 */

import { ReactComponent as CloseX } from '../../../assets/close-x.svg';
import { forwardRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { _x } from '@wordpress/i18n';

const BlockBodyInner = ( props ) => {
	const {
		innerBlocks,
		hasCloseButton,
		isModal,
		isFixed,
		closeButtonColor,
		dataModalCloseAttr,
		closeTop,
		closeRight,
		closeButtonPosition,
		popupWidth,
		accessibleDialogLabel,
		...restProps
	} = props;

	const CloseButtonIcon = applyFilters(
		'makeiteasy-closeButtonIcon',
		CloseX
	);

	const decypherStyle = ( style ) =>
		style?.substring( 0, 4 ) === 'var:'
			? `var(--wp--${ style.substring( 4 ).replaceAll( '|', '--' ) })`
			: style;

	// use style attribute to position close button correctly
	const closeButton = hasCloseButton ? (
		<button
			aria-label={ _x(
				'Close modal',
				'Close button aria label',
				'makeiteasy-popup'
			) }
			className="makeiteasy-popup-close"
			{ ...dataModalCloseAttr }
			style={ {
				top: decypherStyle( closeTop ),
				right: decypherStyle( closeRight ),
				position: closeButtonPosition === 'beside' ? 'static' : null,
			} }
		>
			<CloseButtonIcon
				style={ {
					fill: closeButtonColor,
				} }
			/>
		</button>
	) : null;

	// set max-width to none to prevent alignments if custom size is given
	return (
		<div
			role="dialog"
			aria-modal={ isModal }
			aria-label={ accessibleDialogLabel }
			{ ...{
				...restProps,
				className:
					( restProps.className ?? '' ) + ' makeiteasy-popup-wrapper',
				style: {
					...restProps.style,
					width:
						popupWidth === '' || popupWidth === undefined
							? null
							: popupWidth,
				},
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
		<div
			{ ...outerProps }
			ref={ ref }
			style={ { maxWidth: props.popupWidth ? '100%' : null } }
		>
			<BlockBodyInner { ...innerProps } />
		</div>
	);
} );

BlockBody.save = ( props ) => {
	const { innerProps, outerProps, dataModalCloseAttr } =
		separateOnOuterAndInner(
			props,
			'makeiteasy-popup-outermost',
			undefined,
			true
		);
	const closeAttrsOnOverlay = ! innerProps.isFixed
		? dataModalCloseAttr
		: null;

	return (
		<div aria-hidden="true" { ...outerProps }>
			<div
				className="makeiteasy-popup-overlay"
				tabIndex="-1"
				{ ...closeAttrsOnOverlay }
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
 * @param {string}  addToClassesWithoutHas
 * @param {string}  addToClassesWithHas
 * @param {boolean} isSave
 * @return {Object} classesWithHas, classesWithoutHas
 */
const separateOnOuterAndInner = (
	{
		className,
		anchor,
		innerBlocks,
		isModal,
		isFixed,
		hasCloseButton,
		closeButtonColor,
		closeButtonPosition,
		closeTop,
		closeRight,
		style,
		popupWidth,
		accessibleDialogLabel,
		...restProps
	},
	addToClassesWithoutHas,
	addToClassesWithHas,
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
			isFixed,
			closeButtonColor,
			closeButtonPosition,
			dataModalCloseAttr,
			style,
			closeTop,
			closeRight,
			popupWidth,
			accessibleDialogLabel,
		},
	};
};

export const wrapperAttributes = (
	{
		openType,
		layoutType,
		modalityType,
		openSelector,
		openingTime,
		waitingAfterClosing,
		enabled,
		attachedBaseElement,
		fixedPopupPosition,
		closeButtonPosition,
		daysToShowAgain,
		refererURLMatch,
		popupWidthSameAsOpener,
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
			'on referer': 'open-on-referer',
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
		( enabled ? '' : ' disabled' ) +
		( layoutType === 'fixed' ? ' position-' + fixedPopupPosition : '' ) +
		( closeButtonPosition === 'above' ? ' has-above-close' : '' ),
	// id: save_id, - deprecated
	'data-open-selector': openSelector,
	'data-opening-time': openingTime,
	'data-waiting-after-closing': waitingAfterClosing,
	'data-attached-base-element': attachedBaseElement,
	'data-show-again-in': daysToShowAgain ?? 0,
	'data-referer-url-to-match': refererURLMatch,
	'data-width-same-as-opener': popupWidthSameAsOpener ? 'true' : undefined,
} );
