/**
 * Module to show popup anchored to element
 */
let openedRelativePopups, desktopBreakpoint, topMenu, adminBar, adminBarHeight;

export default function () {
	// calculate rem value
	// Get root element (typically html)
	desktopBreakpoint =
		parseFloat( getComputedStyle( document.documentElement ).fontSize ) *
		57.5631;

	window.addEventListener( 'scroll', () => {
		adjustPopups( 0 );
	} );
	window.addEventListener( 'resize', () => {
		adjustPopups( 0 );
	} );
	refreshOpenPopups();
	adjustPopups();
	topMenu = document.querySelector( '#top-menu' );
	adminBar = document.querySelector( '#wpadminbar' );
	adminBarHeight = adminBar ? adminBar.offsetHeight : 0;
}

/**
 * adjust popups width and position
 * @param {boolean} openPopup 0 - do nothing, 1 - opening popup, 2 - closing popup
 */
function adjustPopups( openPopup = 0 ) {
	// throttle
	window.requestAnimationFrame( () => {
		for ( const popup of openedRelativePopups ) {
			const positionAboveClass = 'popup-position-above';
			const openerSelected = 'opener-is-selected';
			const popupWrapper = popup.querySelector(
				'.makeiteasy-popup-wrapper'
			);
			const attachedBaseElement = document.querySelector(
				popup.dataset?.attachedBaseElement
			);
			if ( ! attachedBaseElement ) {
				// eslint-disable-next-line no-console
				console.warn(
					'Make IT Easy popup: Base element for attachment not found!'
				);
				return;
			}

			// give class to opener to notify that it is selected
			switch ( openPopup ) {
				case 1:
					attachedBaseElement.classList.add( openerSelected );
					break;
				case 2:
					attachedBaseElement.classList.remove( openerSelected );
					break;
			}

			const rect = attachedBaseElement.getBoundingClientRect();

			const windowWidth = window.innerWidth;
			const isDesktop = windowWidth >= desktopBreakpoint;
			const topMenuHeight =
				( topMenu ? topMenu.offsetHeight : 0 ) + adminBarHeight;

			// is available space enough to show popup below selection?
			const isEnoughSpaceBelow =
				rect.bottom + 16 + popup.offsetHeight < window.innerHeight;
			const isEnoughSpaceAbove =
				rect.top - 16 - popup.offsetHeight - topMenuHeight > 0;
			const verticalGap = isDesktop ? 16 : 8;

			if ( isEnoughSpaceBelow || ! isEnoughSpaceAbove ) {
				popup.style.top = rect.bottom + verticalGap + 'px';
				popup.classList.remove( positionAboveClass );
			} else {
				popup.style.top =
					rect.top - verticalGap - popup.offsetHeight + 'px';
				popup.classList.add( positionAboveClass );
			}

			// there is a cached opener property, use it to adjust popup width
			// may be just related to special case
			if ( isDesktop ) {
				popup.style.boxSizing = 'border-box';
				popup.style.left = rect.left + 'px';
				// if set, set the width to same width as opener
				if ( popup.dataset.widthSameAsOpener ) {
					popupWrapper.style.width =
						attachedBaseElement.offsetWidth + 'px';
				}
			} else {
				const sideClass = ( isLeft ) =>
					isLeft ? 'opener-is-left' : 'opener-is-right';
				popup.style.width = null;
				// add class for mobile to know if it is left or right opener
				const isLeft = rect.left < windowWidth / 2;
				popup.classList.add( sideClass( isLeft ) );
				popup.classList.remove( sideClass( ! isLeft ) );

				if ( isLeft ) {
					popup.style.left = rect.left + 'px';
					popup.style.right = null;
				} else {
					popup.style.right = windowWidth - rect.right + 'px';
					popup.style.left = null;
				}
			}
		}
	} );
}

// throttle openpopups differently
export function refreshOpenPopups( openPopup = 0 ) {
	// filter just relative opened popups (actually just popup wrappers)
	openedRelativePopups = document.querySelectorAll(
		'.popup-attached.is-open'
	);
	adjustPopups( openPopup );
}
