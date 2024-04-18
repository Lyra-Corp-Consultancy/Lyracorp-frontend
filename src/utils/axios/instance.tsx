// axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:8080'
});

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
