import axios from 'axios'

/* Create Instance */
const axiosInstance = axios.create({
    // test = "https://jsonplaceholder.typicode.com"
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
}

export { apiService };