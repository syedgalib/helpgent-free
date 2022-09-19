import axios from 'axios';
/* Create Instance */
const axiosInstance = axios.create({
    baseURL: wpWaxCustomerSupportApp_CoreScriptData.apiEndpoint,
    headers: {
        "Content-type": "application/json",
        "X-WP-Nonce": wpWaxCustomerSupportApp_CoreScriptData.apiNonce,
    }
});

const getAll = path => {
    return axiosInstance.get(path);
}

const getAllByArg = ( path, args ) => {
    return axiosInstance.get( path, { params: args } );
}

const getById = ( path, args ) => {
    return axiosInstance.get( path, { params: args } );
}

const dataUpdate = ( path, args ) => {
    return axiosInstance.post( path, args );
};

const dataAdd = ( path, args ) => {
    return axiosInstance.post( path, args );
};

const datadelete = path => {
    return axiosInstance.delete( path );
};
const markRead = path => {
    return axiosInstance.post( path );
};
const markUnRead = path => {
    return axiosInstance.post( path );
};

const apiService = {
    getAll,
    getAllByArg,
    getById,
    dataAdd,
    dataUpdate,
    datadelete,
    markRead,
    markUnRead
}

export default apiService;