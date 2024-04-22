// axiosInstance.js
import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

let instance:AxiosInstance
if (typeof process !== 'undefined') {

    instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    });
} else {
    instance = axios.create({
        baseURL: 'http://localhost:8080'
    });
}

instance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token'); // Assuming the token is stored in localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header with the token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
