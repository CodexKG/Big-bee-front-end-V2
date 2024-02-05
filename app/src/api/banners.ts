import { CancelToken } from 'axios';
import { instance } from './index'

const getBanners = ( sourceToken?: CancelToken) =>
    instance.get(`/banner/`, { cancelToken: sourceToken });

const endpoints = {
    getBanners
};
export default endpoints;
