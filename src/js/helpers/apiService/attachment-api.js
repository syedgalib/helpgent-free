import http from 'Helper/http';
import { generateFileNameFromBlob } from 'Helper/utils';

// createAttachment
const createAttachment = async ( args ) => {
	const formData = new FormData();

	for ( let key in args ) {
		if ( args[ key ] instanceof Blob ) {
			const fileName = generateFileNameFromBlob( args[ key ] );
			formData.append( key, args[ key ], fileName );
			continue;
		}

		formData.append( key, args[ key ] );
	}

	return await http.postData("/attachments", formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		}
	});
};

const api = { createAttachment };

export default api;