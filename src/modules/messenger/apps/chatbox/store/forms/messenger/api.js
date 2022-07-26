import { restRequest } from 'Helper/http';

// sendMessage
const sendMessage = async ({ user_id, session_id, message, message_type, note, attachment_id, seen_by, terms }) => {
	let args = {};

	args.message_type = 'text'; 

	if ( user_id ) {
		args.user_id = user_id;
	}

	if ( session_id ) {
		args.session_id = session_id;
	}

	if ( message ) {
		args.message = message;
	}

	if ( message_type ) {
		args.message_type = message_type;
	}

	if ( note ) {
		args.note = note;
	}

	if ( attachment_id ) {
		args.attachment_id = attachment_id;
	}

	if ( seen_by ) {
		args.seen_by = seen_by;
	}

	if ( terms ) {
		args.terms = terms;
	}

	return await restRequest.post("/messages", args);
};

const api = { sendMessage }

export default api;