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


const http = { axiosInstance, getData, postData, updateData, deleteData }

export default http;