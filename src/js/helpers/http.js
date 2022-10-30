import axios from "axios";

const axiosInstance = axios.create({
	baseURL: wpWaxCustomerSupportApp_CoreScriptData.apiEndpoint,
	headers: {
		"Content-type": "application/json",
		"X-WP-Nonce": wpWaxCustomerSupportApp_CoreScriptData.apiNonce,
	},
});

const getData = ( path, customArgs ) => {
	const args = ( typeof customArgs !== 'undefined' ) ? { params: customArgs } : {};
	return axiosInstance.get( path, args );
}

const postData = ( path, customArgs, customConfig ) => {
	const args   = ( typeof customArgs !== 'undefined' ) ? customArgs : {};
	const config = ( customConfig && typeof customConfig === 'object' ) ? customConfig : {};

	return axiosInstance.post( path, args, config );
}

const updateData = ( path, customArgs, customConfig ) => {
	const args   = ( typeof customArgs !== 'undefined' ) ? customArgs : {};
	const config = ( customConfig && typeof customConfig === 'object' ) ? customConfig : {};

    return axiosInstance.post( path, args, config );
}

const deleteData = ( path, customArgs, customConfig ) => {
	const args   = ( typeof customArgs !== 'undefined' ) ? { data: customArgs } : {};
	const config = ( customConfig && typeof customConfig === 'object' ) ? customConfig : {};

    return axiosInstance.delete( path, args, config );
}

async function getResponse( request, args, config ) {
	let status = {
		success: false,
		message: '',
		data: null,
		headers: {},
	};

	try {
		const response = await request( args, config );

		console.log( 'getResponse', { args, response } );

		status.success    = true;
		status.statusCode = response.status;
		status.message    = response.data.message;
		status.data       = response.data.data;
		status.headers    = response.headers;

		return status;
	} catch ( error ) {

		console.error( { error } );

		status.success    = false;
		status.statusCode = error.response.status;
		status.message    = error.response.data.message;
		status.headers    = error.response.headers;

		return status;
	}
}

async function getRestResponse( request, args, config ) {
	let status = {
		success: false,
		message: '',
		data: null,
		headers: {},
	};

	try {
		const response = await request( args, config );

		status.success    = true;
		status.statusCode = response.status;
		status.message    = 'Operation Successful';
		status.data       = response.data;
		status.headers    = response.headers;

		return status;
	} catch ( error ) {

		console.error( { error } );

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