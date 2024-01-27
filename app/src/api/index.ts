import axios from 'axios';
import produckts from './products'
import auth from './auth';
import carts from './carts'
import shops from './shops'
import reviews from './reviews'
import favorites from './favorites'
import categories from './categories'
import email from './getEmail'

const instance = axios.create({
  // @ts-ignore
  baseURL: window.REACT_APP_SERVER_API !== 'REPLACE_REACT_APP_SERVER_API' ? window.REACT_APP_SERVER_API : process.env.REACT_APP_SERVER_API || 'https://bee.webtm.ru/api/v1/',
  // headers: {
  //   Authorization: `Bearer ${getCookie('access_token')}`
  // }


})


// instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const kc_access = getCookie('kc-access') || 'test_token';
//   if (kc_access) config.headers!['kc-access'] = kc_access;
//   return config
// });
const { getFilteredProducts, getProducts, getProductsById } = produckts
const { login, register } = auth
const { createCart, addToCart, getOwnCartItems, deleteCartItem } = carts
const { getFilteredShops, getShopById, getShops } = shops
const { getReviews, getReviewById, addReview, updateReview, deleteReview, } = reviews
const { addProductToFavorite, delProductFromFavorite } = favorites
const { getCategories, getCategoriesById } = categories
const { getEmail } = email



const api = {
  login,
  getProducts,
  getProductsById,
  register,
  createCart,
  addToCart,
  getOwnCartItems,
  getFilteredProducts,
  getShops,
  getShopById,
  getFilteredShops,
  getCategories,
  deleteCartItem,
  addProductToFavorite,
  delProductFromFavorite,
  getReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
  getCategoriesById,
  getEmail
}

export { instance, api };

