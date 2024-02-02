import { CancelToken } from 'axios';
import { instance } from './index'
import { ProductData } from 'types/types';
import { FilterParams } from 'store/models/WindowTypes';


//product
const getProducts = (shop?: string, search?: string, limit: number = 10, offset: number = 0, sourceToken?: CancelToken) =>
    instance.get<ProductData>(`/products/products/?limit=${limit}&offset=${offset}&search=${search}&shop=${shop}`, { cancelToken: sourceToken });

const getFilteredProducts = (filters: string, sourceToken?: CancelToken) =>
    instance.get<ProductData>(`/products/products/${filters}`, {
        cancelToken: sourceToken
    },);

const getProductsById = (id: number, sourceToken?: CancelToken) =>
    instance.get(`/products/products/${id}`, { cancelToken: sourceToken });


const getProductsofDay = (sourceToken?: CancelToken) =>
    instance.get(`/products/product_day`, { cancelToken: sourceToken });

const endpoints = {
    getProducts,
    getProductsById,
    getFilteredProducts,
    getProductsofDay,
};
export default endpoints;
