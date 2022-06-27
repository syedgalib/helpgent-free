import axios from 'axios'

/* Create Instance */
const axiosInstance = axios.create({
    baseURL: `${location.protocol + '//' + location.host + '/wp-json/wpwax_cs/v1'}`,
    headers: {
        "Content-type": "application/json"
    }
});

const getAll = path =>{
    return axiosInstance.get(path);
}

const dataUpdate = (path, data) => {
    return axiosInstance.put(path, data);
};

const datadelete = path => {
    return axiosInstance.delete(path);
};

const apiService = {
    getAll,
    dataUpdate,
    datadelete
}

export default  apiService;