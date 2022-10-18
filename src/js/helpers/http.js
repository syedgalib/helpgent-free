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
	const config = ( typeof config !== 'undefined' ) ? customConfig : {};

	return axiosInstance.post( path, args, config );
}

const updateData = ( path, customArgs, customConfig ) => {
	const args   = ( typeof customArgs !== 'undefined' ) ? customArgs : {};
	const config = ( typeof config !== 'undefined' ) ? customConfig : {};

    return axiosInstance.post( path, args, config );
}

const deleteData = ( path, customArgs, customConfig ) => {
	const args   = ( typeof args !== 'undefined' ) ? { data: customArgs } : {};
	const config = ( typeof config !== 'undefined' ) ? customConfig : {};

    return axiosInstance.delete( path, args, config );
}

async function getResponse( request, args ) {
	let status = {
		success: false,
		message: '',
		data: null,
		headers: {},
	};

	try {
		const response = await request( args );

		status.success = true;
		status.message = response.data.message;
		status.data    = response.data.data;
		status.headers = response.headers;

		return status;
	} catch ( error ) {

		status.success = false;
		status.message = error.message;
		status.headers = response.headers;

		return status;
	}
}


const http = { axiosInstance, getResponse, getData, postData, updateData, deleteData }

export default http;