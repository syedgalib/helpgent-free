import { restRequest } from 'Helper/http';

// Send Message
const sendMessage = async ( args ) => {
	const defaultArgs = {
		message_type: 'text',
	};

	args = Object.assign( defaultArgs, args );

	return await restRequest.post("/messages", args);
};

const api = { sendMessage };

export default api;