import axios from "axios";

const axiosObj = axios.create({
	baseURL: wpWaxCustomerSupportApp_CoreScriptData.apiEndpoint,
	headers: {
		"Content-type": "application/json",
		"X-WP-Nonce": wpWaxCustomerSupportApp_CoreScriptData.apiNonce,
	},
});

// getChatboxTemplate
const getChatboxTemplate = async ({ pageID, returnDefaultIfResultEmpty }) => {
	let args = {};

	args.page_id = pageID;
	args.return_default_if_result_empty = ( typeof returnDefaultIfResultEmpty === 'boolean' ) ? returnDefaultIfResultEmpty : true;

	return await axiosObj.get("/chatbox-templates", { params: args });
};

// getChatboxTemplate
const createChatboxTemplate = async ({ name, page_ids, is_default, options }) => {
	let args = {};

	args.name       = ( name ) ? name : '';
	args.page_ids   = ( page_ids ) ? page_ids : '';
	args.is_default = ( typeof is_default === 'boolean' ) ? is_default : false;
	args.options    = ( options && typeof options === 'object' ) ? options : {};

	args.options = JSON.stringify( args.options );

	return await axiosObj.post("/chatbox-templates", args);
};

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

	return await axiosObj.post("/messages", args);
};

const api = {
	axiosObj,
	createChatboxTemplate,
	getChatboxTemplate,
	sendMessage,
};

export default api;
