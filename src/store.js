import { createReduxStore, register } from '@wordpress/data';

const DEFAULT_STATE = {
	popupsAreOpen: true,
};

const actions = {
	setPopupsOpen( value ) {
		return {
			type: 'SET_POPUPS',
			value,
		};
	},
};

const selectors = {
	getPopupsOpen( state ) {
		return state.popupsAreOpen;
	},
};

const store = createReduxStore( 'makeiteasy/popups', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_POPUPS':
				return {
					...state,
					popupsAreOpen: action.value,
				};
		}
		return state;
	},

	actions,

	selectors,
} );

register( store );

export default store;
