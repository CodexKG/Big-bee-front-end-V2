import { CancelToken } from 'axios';
import { instance } from './index'
import { Categories } from 'types/types';
import { PopularCategories } from 'store/models/CategoriesType';

const getCategories = (sourceToken?: CancelToken) =>
    instance.get<Categories[]>(`/categories/categories/`, { cancelToken: sourceToken });
const getCategoriesById = (id: number, sourceToken?: CancelToken) =>
    instance.get<Categories>(`/categories/categories/${id}`, { cancelToken: sourceToken });

const getPopularCategories = (sourceToken?: CancelToken) =>
    instance.get<PopularCategories[]>(`/categories/popular/`, { cancelToken: sourceToken });


const endpoints = {
    getCategories,
    getCategoriesById,
    getPopularCategories
};
export default endpoints;
