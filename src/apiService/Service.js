import axios from 'axios'

/* Create Instance */
const axiosInstance = axios.create({
    baseURL: "http://example.com/wp-json/wpwax-vm/v1",
    headers: {
        "Content-type": "application/json"
    }
});

class apiService {
    static get(path = '', params={}) {
        console.log(typeof params);
        return axiosInstance({
            method: 'GET',
            url: path,
            page:params,
            headers:{
                "Content-type": "application/json"
            }
        });
      }
}

export { apiService };