import axios from 'axios'

/* Create Instance */
const axiosInstance = axios.create({
    baseURL: "http://support.local/wp-json/wpwax-vm/v1",
    headers: {
        "Content-type": "application/json"
    }
});

class apiService {
    static get(path = '') {
        return axiosInstance({
            method: 'GET',
            url: path,
            headers:{
                "Content-type": "application/json"
            }
        });
    }
    static patch(path = '', data) {
        return axiosInstance({
            method: 'PATCH',
            url: path,
            data: JSON.stringify(data),
            headers:{
                "Content-type": "application/json"
            }
        });
    }
}

export { apiService };