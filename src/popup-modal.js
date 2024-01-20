// eslint-disable-next-line import/no-extraneous-dependencies
import MicroModal from 'micromodal';
import { refreshOpenPopups } from './popup-variations/open-next-to';

if ( document.readyState === 'loading' )
	document.addEventListener( 'DOMContentLoaded', setUp );
else setUp();

function setUp() {
	if ( ! MicroModal ) return;

	// Micromodal from other projects may be used here
	const selectors = document.querySelectorAll( '.wp-block-makeiteasy-popup' );

	/**
	 * Set up events for popups
	 * @param {HTMLElement}
	 */
	for ( const selector of selectors ) {
		// set if opens on click
		const elementClassList = selector.classList;

		if ( elementClassList.contains( 'open-on-click' ) )
			setOpenEventOnElements( selector );
		if ( elementClassList.contains( 'open-on-timer' ) )
			setOpenOnTimer( selector );
		if ( elementClassList.contains( 'open-on-scroll' ) )
			setOpenOnScroll( selector );
	}

	/* banner */
	// const promoOfferPopup = document.querySelector( '.promo-offer-popup' ).id;
	// // fix clicking on svg path
	// document
	// 	.querySelectorAll( '.makeiteasy-popup-close svg path' )
	// 	.forEach( ( el ) =>
	// 		el.addEventListener( 'click', () => {
	// 			MicroModal.close(
	// 				el.closest( '.wp-block-makeiteasy-popup' ).id
	// 			);
	// 		} )
	// 	);
	// const promoStar = document.querySelector( '.promo-star' );
	// promoStar.addEventListener( 'click', () => {
	// 	showModal( promoOfferPopup );
	// } );
	/* end banner */

	function showModal( id ) {
		MicroModal.show( id, {
			openTrigger: 'data-micromodal-open-' + id,
			closeTrigger: 'data-micromodal-close-' + id,
			onShow: ( modal ) => {
				if (
					modal.classList.contains( 'popup-floating' ) &&
					! modal.classList.contains( 'popup-position-relative' )
				)
					document.body.classList.add( 'has-floating-popup' );
				refreshOpenPopups( 1 );
			},
			onClose: () => {
				document.body.classList.remove( 'has-floating-popup' );
				// if ( modal.classList.contains( 'banner' ) )
				// 	promoStar.classList.add( 'is-visible' );
				refreshOpenPopups( 2 );
			},
		} );
	}

	/**
	 * Set up opening and adjusting for floating popups
	 *
	 * @param {HTMLElement} element .wp-block-makeiteasy-popup
	 */
	function setOpenEventOnElements( element ) {
		for ( const opener of document.querySelectorAll(
			element.dataset.openSelector
		) ) {
			opener.addEventListener( 'click', ( event ) => {
				element.querySelector( '.makeiteasy-popup-wrapper' ).opener =
					event.currentTarget;
				showModal( element.id );
			} );
		}
	}

	/**
	 * Set up opening on Timer
	 * @param {HTMLElement} element
	 */
	function setOpenOnTimer( element ) {
		const timer = element.dataset.timer;
		setTimeout( () => {
			showModal( element.id );
		}, timer );
	}

	/**
	 * Set up opening on scroll with IntersectionObserver
	 * @param {HTMLElement} element
	 */
	function setOpenOnScroll( element ) {
		const elementsToObserve = document.querySelectorAll(
			element.dataset.openSelector
		);
		if ( ! elementsToObserve || elementsToObserve.length === 0 ) {
			// eslint-disable-next-line no-console
			console.warn( 'There was no target to observe for opening popup!' );
			return;
		} // if no opener, do nothing.
		for ( let i = 0; i < elementsToObserve.length; i++ ) {
			new IntersectionObserver( handleIntersection, {
				rootMargin: '0px 0px 0px 0px',
			} ).observe( elementsToObserve[ i ] );
		}

		function handleIntersection( entries, observer ) {
			for ( const entry of entries ) {
				if ( entry.isIntersecting ) {
					showModal( element.id );
					observer.unobserve( entry.target );
				}
			}
		}
	}
	// adjustRelativePopups();
}
