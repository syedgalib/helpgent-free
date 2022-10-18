import http from 'Helper/http';

// createAttachment
const createAttachment = async ( args ) => {
	const formData = new FormData();

	for ( let key in args ) {
		formData.append( key, args[ key ] );
	}

	return await http.postData("/attachments", formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		}
	});
};

const api = { createAttachment }

export default api;