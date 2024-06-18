// eslint-disable-next-line import/no-extraneous-dependencies
import MicroModal from 'micromodal';

import {
	default as adjustRelativePopups,
	refreshOpenPopups,
} from './popup-variations/open-next-to';

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', setUp );
} else {
	setUp();
}

function setUp() {
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
	const selectors = document.querySelectorAll( '.wp-block-makeiteasy-popup' );
	// queue for popups waiting to be opened if modal is active
	const openQueue = [];

	/**
	 * Set up events for popups
	 * @param {HTMLElement}
	 */
	for ( const selector of selectors ) {
		// set if opens on click
		const elementClassList = selector.classList;

		if ( elementClassList.contains( 'open-on-timer' ) ) {
			setOpenOnTimer( selector );
		} else if ( elementClassList.contains( 'open-on-click' ) ) {
			setOpenEventOnElements( selector, 'click' );
		} else if ( elementClassList.contains( 'open-on-hover' ) ) {
			setOpenEventOnElements( selector, 'pointerover' );
		} else if ( elementClassList.contains( 'open-on-scroll' ) ) {
			setOpenOnScroll( selector );
		}
	}

	/**
	 * Hook additional actions on show/close
	 *
	 * @param {string} id popup id
	 */
	function showModal( id ) {
		// close other popup if any
		closeOtherPopup();
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
			},
			onClose: ( modal ) => {
				document.body.classList.remove( 'has-floating-popup' );
				if ( modal.classList.contains( 'open-on-hover' ) ) {
					cleaner( modal );
				}
				// refresh attached popups
				refreshOpenPopups( 2 );
				// process queue
				processQueue();
				// raise event for extenders
				modal.dispatchEvent( closeModal );
			},
		} );
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

			// if event is hover wait after pointer is removed before hovering again
			if ( event.type === 'pointerover' ) {
				popupElement.waitingTimerActive = true;
			}
			showModal( popupElement.id );
		}
	}

	function cleaner( popupElement ) {
		if ( popupElement.dataset.waitingAfterClosing === '-1s' ) {
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
	 */
	function setOpenOnTimer( element ) {
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
					openQueue.push( element.id );
				}
				return;
			}

			showModal( element.id );
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

	adjustRelativePopups();

	/**
	 * close other popups
	 */
	function closeOtherPopup() {
		const otherPopup = document.querySelector(
			'.is-open.wp-block-makeiteasy-popup'
		);
		if ( otherPopup ) {
			MicroModal.close( otherPopup.id );
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
}
