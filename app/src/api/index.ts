import axios from 'axios';
import produckts from './products'
import auth from './auth';
import carts from './carts'
import shops from './shops'
import reviews from './reviews'
import favorites from './favorites'
import categories from './categories'
import banners from './banners'
import email from './getEmail'
import biling from './biling'
import settings from './settings'

const instance = axios.create({
  // @ts-ignore
  baseURL: window.REACT_APP_SERVER_API !== 'REPLACE_REACT_APP_SERVER_API' ? window.REACT_APP_SERVER_API : process.env.REACT_APP_SERVER_API || 'https://bee.webtm.ru/api/v1/',
  // headers: {
  //   Authorization: `Bearer ${getCookie('access_token')}`
  // }


})
//@ts-ignore



// instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   const kc_access = getCookie('kc-access') || 'test_token';
//   if (kc_access) config.headers!['kc-access'] = kc_access;
//   return config
// });


const { getFilteredProducts, getProducts, getProductsById, getProductBestSellers, getForYouRandomProducts, getPromotionRandomProducts, getProductsofDay, getFavoriteProducts } = produckts
const { login, register } = auth
const { createCart, addToCart, getOwnCartItems, deleteCartItem, updateQuantityCartItem, updateSelectedCartItem,deleteCartItems } = carts
const { getFilteredShops, getShopById, getShops } = shops
const { getReviews, getReviewById, addReview, updateReview, deleteReview, addLike, adddislike } = reviews
const { addProductToFavorite, delProductFromFavorite, getProductsFromFavorite } = favorites
const { getCategories, getCategoriesById,getPopularCategories } = categories
const { getBanners } = banners
const { getEmail } = email
const { orders } = biling
const { getSettings } = settings



const api = {
  adddislike,
  addLike,
  orders,
  login,
  getProducts,
  getProductsById,
  register,
  createCart,
  addToCart,
  getOwnCartItems,
  getFilteredProducts,
  getProductsofDay,
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
  updateQuantityCartItem,
  updateSelectedCartItem,
  getProductBestSellers,
  getForYouRandomProducts,
  getPromotionRandomProducts,
  getBanners,
  getEmail,
  getFavoriteProducts,
  getSettings,
  getPopularCategories,
  getProductsFromFavorite,
  deleteCartItems
}

export { instance, api };

