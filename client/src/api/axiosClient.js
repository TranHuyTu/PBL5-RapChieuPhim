import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080',
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response.data;
    },
    (error) => {
        // Handle errors
        throw error;
    },
);
export default axiosClient;
