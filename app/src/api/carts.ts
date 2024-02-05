import { CancelToken } from 'axios';
import { instance } from './index'


//cart
const createCart = (id: number, sourceToken?: CancelToken) =>
    instance.post(
        '/carts/cart/',
        { id: id, },
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


const getOwnCartItems = (id: number, sourceToken?: CancelToken) =>
    instance.get(`/carts/cart/${id}`, { cancelToken: sourceToken });

const deleteCartItem = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/carts/items/${id}`, {
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MjcxMDgzLCJpYXQiOjE3MDQ2NzkwODMsImp0aSI6IjAwYjQxNjVhZWJhNTQ1M2E4Y2EyYTAwN2VlYzYxNjk2IiwidXNlcl9pZCI6Mn0.tZkF8Xf_YHUIHqrFMkHqIK-OhC_0FaSEM-tw-JQ6YQ8`
        },
    cancelToken: sourceToken
},);

const updateCartItem = (id: number,quantity:number, sourceToken?: CancelToken) =>
instance.put(
    `/carts/items/${id}`,{
    params: {
        quantity: quantity
    },
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3MjcxMDgzLCJpYXQiOjE3MDQ2NzkwODMsImp0aSI6IjAwYjQxNjVhZWJhNTQ1M2E4Y2EyYTAwN2VlYzYxNjk2IiwidXNlcl9pZCI6Mn0.tZkF8Xf_YHUIHqrFMkHqIK-OhC_0FaSEM-tw-JQ6YQ8`
    },
    cancelToken: sourceToken 
});

const endpoints = {
    createCart,
    addToCart,
    getOwnCartItems,
    deleteCartItem,
    updateCartItem
};
export default endpoints;
