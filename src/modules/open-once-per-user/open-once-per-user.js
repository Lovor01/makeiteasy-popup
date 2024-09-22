/**
 * Open once per user, use cookies to store info about opening
 */

import Cookies from 'js-cookie';

/**
 * hasBeenOpened
 * Is popup with id shown first time?
 *
 * @param {string} id
 * @param {string} showAgainIn
 * @return {boolean} do not show popup again?
 */
export default function ( id, showAgainIn ) {
	function getDateXDaysFromNow( numDays ) {
		// Calculate the number of milliseconds for the desired number of days
		const millisecondsToAdd = numDays * 86400000; // Number of milliseconds in a day
		// Create a new Date object by adding the milliseconds to the current date
		const futureDate = new Date( new Date().getTime() + millisecondsToAdd );

		return futureDate.toISOString();
	}

	const dateToShowAgain = Cookies.get( `mie-opened-${ id }` );
	// this is used to detect if in the meantime value was changed in editor - in that case show popup and reset cookies
	const lastWrittenShowAgain = Cookies.get( `mie-last-written-${ id }` );
	let doNotShowAgain = true;
	if (
		lastWrittenShowAgain !== showAgainIn ||
		dateToShowAgain === undefined ||
		( dateToShowAgain !== undefined &&
			new Date() > new Date( dateToShowAgain ) )
	) {
		doNotShowAgain = false;
		const days = showAgainIn ? parseInt( showAgainIn ) : 0;
		Cookies.set( `mie-opened-${ id }`, getDateXDaysFromNow( showAgainIn ), {
			expires: days,
		} );
		Cookies.set( `mie-last-written-${ id }`, showAgainIn, {
			expires: days,
		} );
	}
	return doNotShowAgain;
}
