// eslint-disable-next-line import/no-extraneous-dependencies
import MicroModal from 'micromodal';
import hasBeenOpened from './modules/open-once-per-user/open-once-per-user.js';

// TODO: instead of aligning attached popup with left edge of opener, align it with center of opener or give user a choice

import {
	default as adjustRelativePopups,
	refreshOpenPopups,
} from './popup-variations/open-next-to.js';

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', setUp );
} else {
	setUp();
}

function setUp() {
	// eslint-disable-next-line prettier/prettier
	if ( ! MicroModal ) {
		return;
	}

	/**
	 * setup custom events for extenders
	 * actions can be hooked to this events to fire on opening and closing modals
	 */
	const openModal = new Event( 'makeiteasy/openModal' ),
		closeModal = new Event( 'makeiteasy/closeModal' );

	// Micromodal from other projects may be used here
	const popupsBlocks = document.querySelectorAll(
		'.wp-block-makeiteasy-popup'
	);
	// queue for popups waiting to be opened if modal is active
	const openQueue = [];

	// flag to prevent putting popup in queue if another is closing, but not yet removed from DOM
	let isClosing = false;

	/**
	 * Set up events for popups
	 * @param {HTMLElement}
	 */
	for ( const popupBlock of popupsBlocks ) {
		// check if popup is set to open only once in interval (0 or undefined)
		const showAgainIn = popupBlock.dataset.showAgainIn;
		if (
			! [ '0', undefined ].includes( showAgainIn ) &&
			hasBeenOpened( popupBlock.id, showAgainIn )
		) {
			continue;
		}

		// data attributes shortcut
		const elementDataset = popupBlock.dataset;

		/**
		 * Legacy opening (deprecated)
		 * check for openType, it was not present in 1.2.0 and before
		 * TODO: remove and increase major version of plugin
		 */
		if ( ! elementDataset.openType ) {
			const elementClassList = popupBlock.classList;

			if ( elementClassList.contains( 'open-on-timer' ) ) {
				setOpenOnTimer( popupBlock );
			} else if ( elementClassList.contains( 'open-on-click' ) ) {
				setOpenEventOnElements( popupBlock, 'click' );
			} else if ( elementClassList.contains( 'open-on-hover' ) ) {
				setOpenEventOnElements( popupBlock, 'pointerover' );
			} else if ( elementClassList.contains( 'open-on-scroll' ) ) {
				setOpenOnScroll( popupBlock );
			} else if ( elementClassList.contains( 'open-on-exit-intent' ) ) {
				setOpenOnExitIntent( popupBlock );
			} else if ( elementClassList.contains( 'open-on-referer' ) ) {
				openOnReferer( popupBlock );
			}
		}
		/**
		 * End legacy opening
		 */

		// set up opening event - new code

		switch ( elementDataset.openType ) {
			case 'on timer':
				if (
					elementDataset.refererUrlMatch &&
					elementDataset.openingTime
				) {
					setOpenOnTimer( popupBlock, true );
				} else {
					setOpenOnTimer( popupBlock );
				}
				break;
			case 'on scroll':
				setOpenOnScroll( popupBlock );
				break;
			case 'on click':
				setOpenEventOnElements( popupBlock, 'click' );
				break;
			case 'on hover':
				setOpenEventOnElements( popupBlock, 'pointerover' );
				break;
			/*
			 * New feature exit on intent introduced in 1.3.0
			 * It works only on desktop, while user moves mouse near top edge of viewport, it is not triggered by touch devices
			 */
			case 'on exit intent':
				setOpenOnExitIntent( popupBlock );
				break;
		}
	}

	/**
	 * Hook additional actions on show/close
	 *
	 * @param {string}  id      popup id
	 * @param {boolean} isHover opening type is hover
	 */
	function showModal( id, isHover = false ) {
		function showPopupCallback() {
			MicroModal.show( id, {
				// we have customized openers and closers
				openTrigger: 'data-micromodal-open-' + id,
				closeTrigger: 'data-micromodal-close-' + id,
				onShow: ( modal ) => {
					if ( modal.classList.contains( 'popup-modal' ) ) {
						document.body.classList.add( 'has-floating-popup' );
					}
					// refresh attached popups
					refreshOpenPopups( 1 );
					// raise event for extenders
					modal.dispatchEvent( openModal );
					// if popup is too small, adjust dimensions
					checkPopupDimensions( modal );
				},
				onClose: ( modal ) => {
					document.body.classList.remove( 'has-floating-popup' );
					if ( modal.classList.contains( 'open-on-hover' ) ) {
						cleaner( modal );
					}
					// refresh attached popups
					refreshOpenPopups( 2 );
					// set flag to prevent adding popup to queue if this one is closing
					isClosing = true;
					// process queue
					processQueue();
					// raise event for extenders
					modal.dispatchEvent( closeModal );
					isClosing = false;
				},
			} );
		}

		/**
		 * check other popups if any is open
		 */
		const otherPopup = isClosing
			? false
			: document.querySelector( '.is-open.wp-block-makeiteasy-popup' );
		if ( otherPopup ) {
			// if other popup is already open and it is not hover, put this one in queue
			if ( ! isHover ) {
				addToQueue( id );
			}
		} else {
			showPopupCallback( id );
		}
	}

	/**
	 * Set up opening and adjusting for floating popups
	 *
	 * @param {HTMLElement} element   .wp-block-makeiteasy-popup
	 * @param {string}      eventType
	 */
	function setOpenEventOnElements( element, eventType ) {
		if ( ! element.dataset.openSelector ) {
			return;
		}
		for ( const opener of document.querySelectorAll(
			element.dataset.openSelector
		) ) {
			opener.addEventListener( eventType, ( event ) =>
				processEvent( event, element )
			);
			if ( eventType === 'pointerover' ) {
				opener.addEventListener( 'pointerleave', () => {
					closeModalFn( element );
				} );
			}
		}

		/**
		 * set event
		 *
		 * @param {*} event
		 * @param {*} popupElement popup element which is shown
		 * @return {void}
		 */
		function processEvent( event, popupElement ) {
			//  bail out if popup is already open or if it is waiting to be opened
			if (
				popupElement.classList.contains( 'is-open' ) ||
				popupElement.waitingTimerActive
			) {
				return;
			}

			// if event is hover and there are no other popups open, add flag to wait certain time before opening again
			const isHover = event.type === 'pointerover';
			if (
				isHover &&
				! document.querySelector( '.wp-block-makeiteasy-popup.is-open' )
			) {
				popupElement.waitingTimerActive = true;
			}
			showModal( popupElement.id, isHover );
		}

		function closeModalFn( popupElement ) {
			if ( popupElement.classList.contains( 'is-open' ) ) {
				MicroModal.close( popupElement.id );
			}
		}
	}

	// if popup is hover type, add timer to prevent it from opening again immediately after closing
	function cleaner( popupElement ) {
		if (
			! popupElement.dataset.waitingAfterClosing ||
			popupElement.dataset.waitingAfterClosing === '-1s'
		) {
			return;
		}
		setTimeout(
			() => {
				popupElement.waitingTimerActive = false;
			},
			parseInt( popupElement.dataset.waitingAfterClosing ) * 1000
		);
	}

	/**
	 * Set up opening on Timer
	 * @param {HTMLElement} element
	 * @param {boolean}     triggerOpenOnReferer
	 */
	function setOpenOnTimer( element, triggerOpenOnReferer = false ) {
		const timer = element.dataset.openingTime;
		// convert integer part to number
		let numberPart = parseFloat( timer );
		const unitPart = timer.replace( numberPart, '' );
		if ( unitPart === 's' ) {
			numberPart = numberPart * 1000;
		}
		setTimeout( () => {
			// if there is another modal popup open, put it in queue, only if it is timer popup
			if ( document.querySelector( '.is-open.popup-modal' ) ) {
				if ( element.classList.contains( 'open-on-timer' ) ) {
					addToQueue( element.id );
				}
				return;
			}

			if ( triggerOpenOnReferer ) {
				openOnReferer( element );
			} else {
				showModal( element.id );
			}
		}, numberPart );
	}

	/**
	 * Set up opening on scroll with IntersectionObserver
	 * @param {HTMLElement} element
	 */
	function setOpenOnScroll( element ) {
		if ( ! element.dataset.openSelector ) {
			return;
		}
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
				threshold: 1,
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

	/**
	 * Set up opening on desktop exit intent
	 * Opens when pointer leaves viewport near top edge
	 * @param {HTMLElement} element
	 */
	function setOpenOnExitIntent( element ) {
		if ( ! window.matchMedia( '(hover: hover)' ).matches ) {
			return;
		}

		const parsedDelaySeconds = parseFloat(
			element.dataset.exitIntentDelay
		);
		const activationDelayMs =
			Number.isFinite( parsedDelaySeconds ) && parsedDelaySeconds > 0
				? parsedDelaySeconds * 1000
				: 0;
		let isActive = activationDelayMs === 0;

		if ( ! isActive ) {
			setTimeout( () => {
				isActive = true;
			}, activationDelayMs );
		}

		let hasTriggered = false;

		const handleMouseOut = ( event ) => {
			if ( hasTriggered ) {
				return;
			}

			if ( ! isActive ) {
				return;
			}

			if ( event.relatedTarget ) {
				return;
			}

			if ( event.clientY > 10 ) {
				return;
			}

			hasTriggered = true;
			document.removeEventListener( 'mouseout', handleMouseOut );
			showModal( element.id );
		};

		document.addEventListener( 'mouseout', handleMouseOut );
	}

	function openOnReferer( element ) {
		const refererUrl =
			element.dataset.refererUrlMatch ??
			// legacy name
			element.dataset.refererUrlToMatch;
		if ( ! refererUrl ) {
			return;
		}
		if ( document.referrer.indexOf( refererUrl ) !== -1 ) {
			showModal( element.id );
		}
	}

	adjustRelativePopups();

	/**
	 * add to queue
	 * @param {string} id
	 */
	function addToQueue( id ) {
		// add to queue if not already there and queue is not too long
		if ( ! openQueue.includes( id ) && openQueue.length < 100 ) {
			openQueue.push( id );
		}
	}

	/**
	 * check queue for popups and open from queue if there are elements
	 */
	function processQueue() {
		if ( openQueue.length === 0 ) {
			return;
		}
		showModal( openQueue.pop() );
	}

	/**
	 * Check if popup is to small; if it is, set default dimensions
	 * @param {HTMLElement} popup
	 */
	function checkPopupDimensions( popup ) {
		const popupWrapper = popup.querySelector( '.makeiteasy-popup-wrapper' );
		const contentWrapper = popupWrapper.querySelector(
			'.makeiteasy-popup-content-wrapper'
		);
		if ( ! popupWrapper || ! contentWrapper ) {
			return;
		}
		if ( contentWrapper.clientWidth < 5 ) {
			contentWrapper.style.width = getComputedStyle(
				popupWrapper
			).getPropertyValue( '--wp--style--global--content-size' );
		}
		if ( contentWrapper.clientHeight < 11 ) {
			contentWrapper.style.height = '300px';
		}
	}
}
