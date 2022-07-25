import { restRequest } from 'Helper/http';

// createAttachment
const createAttachment = async ( args ) => {
	let args = {};

	return await restRequest.post("/attachment", args);
};

const api = { createAttachment }

export default api;