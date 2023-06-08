import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/',
    timeout: 5000,
    headers: {
        'Content-type': 'application/json',
    },
});
axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);

export default axiosClient;
