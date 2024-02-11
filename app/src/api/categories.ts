import { CancelToken } from 'axios';
import { instance } from './index'
import { Categories } from 'types/types';

const getCategories = (sourceToken?: CancelToken) =>
    instance.get<Categories[]>(`/categories/categories/`, { cancelToken: sourceToken });
const getCategoriesById = (id: number, sourceToken?: CancelToken) =>
    instance.get<Categories>(`/categories/categories/${id}`, { cancelToken: sourceToken });



const endpoints = {
    getCategories,
    getCategoriesById
};
export default endpoints;
