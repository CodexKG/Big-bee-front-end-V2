import { CancelToken } from 'axios';
import { instance } from './index'
import { getCookie } from 'helpers/cookies';
import { FavoriteProductData } from 'store/models/FavoriteTypes';

const addProductToFavorite = (product: number, user : number, sourceToken?: CancelToken) =>{
    return instance.post(
     `/products/favorite/`,
     { user:user, product:product },
     {
     headers: {
         Authorization: `Bearer ${getCookie("access_token")}`
     },
     cancelToken: sourceToken
 } 
    )
 }
const delProductFromFavorite = (fav_id: number, sourceToken?: CancelToken) =>
{
    return instance.delete(
        `/products/favorite/${fav_id}`,
        {
        headers: {
            Authorization: `Bearer ${getCookie("access_token")}`
        },
        cancelToken: sourceToken
    })
}

const getProductsFromFavorite = ( sourceToken?: CancelToken) =>{
    return instance.get<FavoriteProductData[]>(
        `/products/favorite/`,
        {
        headers: {
            Authorization: `Bearer ${getCookie("access_token")}`
        },
        cancelToken: sourceToken
    })
}

const endpoints = {
    addProductToFavorite,
    delProductFromFavorite,
    getProductsFromFavorite
};
export default endpoints;
