import { CancelToken } from 'axios';
import { instance } from './index';

const getEmail = (email: string, sourceToken?: CancelToken) =>
    instance.post('/get_emails/', { email }, { cancelToken: sourceToken });

const endpoints ={
    getEmail
};

export default endpoints;