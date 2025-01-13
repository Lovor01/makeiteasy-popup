// migration from 1.2.0

export default function ( attributes ) {
	switch ( attributes.openType ) {
		case 'on referer':
			return {
				...attributes,
				openType: 'on timer',
				openingTime: '0s',
			};
	}
	return attributes;
}
