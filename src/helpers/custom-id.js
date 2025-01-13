/**
 * Search if id exists among other makeiteasy-popup blocks
 * create new id
 */

import { customAlphabet } from 'nanoid/non-secure';

export const idExists = ( saveIdNeedle, initialBlocks, clientId ) => {
	const recursiveSearch = ( blocks ) => {
		blocks.forEach( ( block ) => {
			if (
				block.attributes.anchor === saveIdNeedle &&
				block.clientId !== clientId
			) {
				blockExists = true;
			} else if ( block.innerBlocks ) {
				recursiveSearch( block.innerBlocks );
			}
		} );
	};

	let blockExists = false;
	recursiveSearch( initialBlocks );
	return blockExists;
};

export const customNanoId = ( blocks, clientId ) => {
	let id;
	do {
		id = customAlphabet( '0123456789abcdefghijklmnopqrstuvwxyz', 10 )();
	} while ( idExists( id, blocks, clientId ) );
	return id;
};
