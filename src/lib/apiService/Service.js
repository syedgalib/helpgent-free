import axios from 'axios';
console.log(wpWaxCustomerSupportApp_CoreScriptData);
/* Create Instance */
const axiosInstance = axios.create({
    baseURL: wpWaxCustomerSupportApp_CoreScriptData.apiEndpoint,
    headers: {
        "Content-type": "application/json",
        "X-WP-Nonce": wpWaxCustomerSupportApp_CoreScriptData.apiNonce,
    }
});

const getAll = path =>{
    return axiosInstance.get(path);
}

const dataUpdate = (path, args) => {
    return axiosInstance.post(path, args);
};

const dataAdd = (path, args) => {
    console.log(args);
    return axiosInstance.post(path, args);
};

const datadelete = path => {
    return axiosInstance.delete(path);
};

const apiService = {
    getAll,
    dataAdd,
    dataUpdate,
    datadelete
}

export default apiService;