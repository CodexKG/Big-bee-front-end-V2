import { CancelToken } from 'axios';
import { instance } from './index'
import { Categories } from 'types/types';

const getPopularCategories = (sourceToken?: CancelToken) =>
    instance.get<Categories[]>(`/categories/popular/`, { cancelToken: sourceToken });

const endpoints = {
    getPopularCategories
};
export default endpoints;
