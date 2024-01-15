import { CancelToken } from 'axios';
import { instance } from './index'
import { ShopData } from 'types/types';



const getShops = (search?: string, limit: number = 10, offset: number = 0, sourceToken?: CancelToken) =>
    instance.get<ShopData>(`/shops/?limit=${limit}&offset=${offset}&search=${search}`, { cancelToken: sourceToken });

const getShopById = (id: number, sourceToken?: CancelToken) =>
    instance.get(`/shops/${id}`, { cancelToken: sourceToken });

const getFilteredShops = (search?: string, limit: number = 10, offset: number = 0, sourceToken?: CancelToken) =>
    instance.get<ShopData>(`/shops/`, {
        params: {
            search: search,
            limit: limit,
            offset: offset
        },
        cancelToken: sourceToken
    },);



const endpoints = {
    getShops,
    getShopById,
    getFilteredShops,
};
export default endpoints;
