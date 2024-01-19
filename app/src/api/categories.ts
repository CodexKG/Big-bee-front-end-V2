import { CancelToken } from 'axios';
import { instance } from './index'
import { Categories } from 'types/types';

const getCategories = (sourceToken?: CancelToken) =>
    instance.get<Categories[]>(`/categories/`, { cancelToken: sourceToken });


const endpoints = {
    getCategories,
};
export default endpoints;
