import { CancelToken } from 'axios';
import { instance } from './index'
import { ProductData } from 'types/types';


//product
const getProducts = (shop?: string, search?: string, limit: number = 10, offset: number = 0, sourceToken?: CancelToken) =>
    instance.get<ProductData>(`/products/?limit=${limit}&offset=${offset}&search=${search}&shop=${shop}`, { cancelToken: sourceToken });

const getFilteredProducts = (shop?: string, category?: string, search?: string, limit: number = 10, offset: number = 0, sourceToken?: CancelToken) =>
    instance.get<ProductData>(`/products/?${category}`, {
        params: {
            search: search,
            limit: limit,
            offset: offset,
            shop: shop
        },
        cancelToken: sourceToken
    },);

const getProductsById = (id: number, sourceToken?: CancelToken) =>
    instance.get(`/products/${id}`, { cancelToken: sourceToken });


const endpoints = {
    getProducts,
    getProductsById,
    getFilteredProducts
};
export default endpoints;
