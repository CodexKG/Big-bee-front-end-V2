import { CancelToken } from 'axios';
import { instance } from './index'


//cart
const createCart = (id: number, sourceToken?: CancelToken) =>
    instance.post(
        '/carts/cart/',
        { user: id, },
        { cancelToken: sourceToken }
    );

const addToCart = (cart: number, product: number,quantity:number, sourceToken?: CancelToken) =>
    instance.post(
        '/carts/items/',
        {
            cart: cart,
            product: product,
            quantity: quantity
        },
        { cancelToken: sourceToken }
    );


const getOwnCartItems = (id?: number, sourceToken?: CancelToken) =>
    instance.get(`/carts/cart/?user=${id}`, { cancelToken: sourceToken });

const deleteCartItem = (id: number, access_token:string, sourceToken?: CancelToken) =>
    instance.delete(`/carts/items/${id}/`, {
        headers: {
            Authorization: `Bearer ${access_token}`
        },
    cancelToken: sourceToken
},);

const updateQuantityCartItem = (id: number,quantity:number, access_token:string, sourceToken?: CancelToken) =>
instance.patch(
    `/carts/items/${id}/`,
    {
        quantity: quantity
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      cancelToken: sourceToken 
    }
);

const updateSelectedCartItem = (id: number,is_selected:boolean, access_token:string, sourceToken?: CancelToken) =>
instance.patch(
    `/carts/items/${id}/`,
    {
      is_selected: is_selected
    },
    {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      cancelToken: sourceToken 
    }
);

const endpoints = {
    createCart,
    addToCart,
    getOwnCartItems,
    deleteCartItem,
    updateQuantityCartItem,
    updateSelectedCartItem,
};
export default endpoints;
