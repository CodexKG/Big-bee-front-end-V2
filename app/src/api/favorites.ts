import { CancelToken } from 'axios';
import { instance } from './index'


const addProductToFavorite = (user_id?: number, product_id?: number, sourceToken?: CancelToken) =>
    instance.post(`/favorite/`, { user_id, product_id }, { cancelToken: sourceToken });

const delProductFromFavorite = (fav_id: number, sourceToken?: CancelToken) =>
    instance.post(`/favorite/${fav_id}`, { fav_id }, { cancelToken: sourceToken });


const endpoints = {
    addProductToFavorite,
    delProductFromFavorite,
};
export default endpoints;
