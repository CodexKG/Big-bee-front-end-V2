import { CancelToken } from 'axios';
import { instance } from './index'
import { getCookie } from 'helpers/cookies';

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
    instance.post(`/favorite/${fav_id}`, { fav_id }, { cancelToken: sourceToken });


const endpoints = {
    addProductToFavorite,
    delProductFromFavorite,
};
export default endpoints;
