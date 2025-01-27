
import axios from 'axios';


const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

// Добавляем токен в каждый запрос
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;

