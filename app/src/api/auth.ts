import { CancelToken } from 'axios';
import { instance } from './index'


const login = (username: string, password: string, sourceToken?: CancelToken) =>
    instance.post('/users/login/', { username, password }, { cancelToken: sourceToken });

const register = (username: string, password: string, confirm_password: string, sourceToken?: CancelToken) =>
    instance.post('/users/', { username, password, confirm_password }, { cancelToken: sourceToken });


const getUsers = (sourceToken?: CancelToken) =>
    instance.get('/users/', { cancelToken: sourceToken });

const endpoints = {
    login,
    register,
    getUsers
};
export default endpoints;
