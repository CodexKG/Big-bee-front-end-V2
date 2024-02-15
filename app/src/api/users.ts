import { CancelToken } from 'axios';
import { instance } from './index'
import { getCookie } from 'helpers/cookies';

const refreshToken = (sourceToken?: CancelToken) =>
    instance.post(`/users/refresh/`,{refresh:getCookie('refresh_token')},  { cancelToken: sourceToken});


const endpoints = {
    refreshToken
};
export default endpoints;
