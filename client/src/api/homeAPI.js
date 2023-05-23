import axiosClient from './axiosClient';

class homeAPI {
    getAll = (params) => {
        const url = '/TrangChu';
        return axiosClient.post(url, { params });
    };
}
const HomeAPI = new homeAPI();
export default HomeAPI;
