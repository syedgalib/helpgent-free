import axios from "axios";

let headers = { "Content-type": "application/json" };

if ( wpWaxCustomerSupportApp_CoreScriptData.auth_token ) {
	headers['Helpgent-Token'] = wpWaxCustomerSupportApp_CoreScriptData.auth_token;
} else {
	headers['X-WP-Nonce'] = wpWaxCustomerSupportApp_CoreScriptData.apiNonce;
}

const axiosInstance = axios.create({
	baseURL: wpWaxCustomerSupportApp_CoreScriptData.apiEndpoint,
	headers: headers,
});

const getAxiosInstance = function( baseURL ) {
	return axios.create({
		baseURL: ( baseURL ) ? baseURL : wpWaxCustomerSupportApp_CoreScriptData.apiEndpoint,
		headers: headers,
	});
}

const getData = ( path, customArgs, baseURL ) => {
	const args = ( typeof customArgs !== 'undefined' ) ? { params: customArgs } : {};
	return getAxiosInstance( baseURL ).get( path, args );
}

const postData = ( path, customArgs, customConfig, baseURL ) => {
	const args   = ( typeof customArgs !== 'undefined' ) ? customArgs : {};
	const config = ( customConfig && typeof customConfig === 'object' ) ? customConfig : {};

	return getAxiosInstance( baseURL ).post( path, args, config );
}

const updateData = ( path, customArgs, customConfig, baseURL ) => {
	const args   = ( typeof customArgs !== 'undefined' ) ? customArgs : {};
	const config = ( customConfig && typeof customConfig === 'object' ) ? customConfig : {};

    return getAxiosInstance( baseURL ).post( path, args, config );
}

const deleteData = ( path, customArgs, customConfig, baseURL ) => {
	const args   = ( typeof customArgs !== 'undefined' ) ? { data: customArgs } : {};
	const config = ( customConfig && typeof customConfig === 'object' ) ? customConfig : {};

    return getAxiosInstance( baseURL ).delete( path, args, config );
}

async function getResponse( request, args, config, apiBase ) {
	let status = {
		success: false,
		message: '',
		data: null,
		headers: {},
	};

	try {
		const response = await request( args, config, apiBase );

		status.success    = true;
		status.statusCode = response.status;
		status.message    = response.data.message;
		status.data       = response.data.data;
		status.headers    = response.headers;

		return status;
	} catch ( error ) {

		status.success    = false;
		status.statusCode = error.response.status;
		status.message    = error.response.data.message;
		status.headers    = error.response.headers;

		return status;
	}
}

async function getRestResponse( request, args, config, apiBase ) {
	let status = {
		success: false,
		message: '',
		data: null,
		headers: {},
	};

	try {
		const response = await request( args, config, apiBase );

		status.success    = true;
		status.statusCode = response.status;
		status.message    = 'Operation Successful';
		status.data       = response.data;
		status.headers    = response.headers;

		return status;
	} catch ( error ) {

		status.success    = false;
		status.statusCode = error.response.status;
		status.message    = error.response.data.message;
		status.headers    = error.response.headers;

		return status;
	}
}


const http = {
	axiosInstance,
	getResponse,
	getRestResponse,
	getData,
	postData,
	updateData,
	deleteData
}

export default http;