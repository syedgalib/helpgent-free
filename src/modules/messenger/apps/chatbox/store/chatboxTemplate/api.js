import http from 'Helper/http';

// getChatboxTemplate
const getChatboxTemplate = async({ pageID, returnDefaultIfResultEmpty }) => {
	let args = {};

	args.page_id = pageID;
	args.return_default_if_result_empty = ( typeof returnDefaultIfResultEmpty === 'boolean' ) ? returnDefaultIfResultEmpty : true;

	return await http.getData("/chatbox-templates", { params: args });
};

// getChatboxTemplate
const createChatboxTemplate = async({ name, page_ids, is_default, options }) => {
	let args = {};

	args.name       = ( name ) ? name : '';
	args.page_ids   = ( page_ids ) ? page_ids : '';
	args.is_default = ( typeof is_default === 'boolean' ) ? is_default : false;
	args.options    = ( options && typeof options === 'object' ) ? options : {};

	args.options = JSON.stringify( args.options );

	return await http.postData("/chatbox-templates", args);
};

const api = {
    getChatboxTemplate,
    createChatboxTemplate
}

export default api;