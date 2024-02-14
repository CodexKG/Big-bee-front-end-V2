import { CancelToken } from "axios";
import { instance } from "./index";
import { ProductData } from "types/types";

//product
const getProducts = (
  shop?: string,
  search?: string,
  limit: number = 10,
  offset: number = 0,
  sourceToken?: CancelToken
) =>
  instance.get<ProductData>(
    `/products/products/?limit=${limit}&offset=${offset}&search=${search}&shop=${shop}`,
    { cancelToken: sourceToken }
  );

const getFilteredProducts = (
  shop?: string,
  category?: string,
  search?: string,
  limit: number = 10,
  offset: number = 0,
  sourceToken?: CancelToken
) =>
  instance.get<ProductData>(`/products/products/?${category}`, {
    params: {
      search: search,
      limit: limit,
      offset: offset,
      shop: shop,
    },
    cancelToken: sourceToken,
  });

const getProductsById = (id: number, sourceToken?: CancelToken) =>
  instance.get(`/products/products/${id}`, { cancelToken: sourceToken });

const getProduct = (id: number, sourceToken?: CancelToken) =>
  instance.get(`/products/products/${id}`, { cancelToken: sourceToken });

const getProductBestSellers = (sourceToken?: CancelToken) =>
  instance.get(`/products/bestsellers/`, { cancelToken: sourceToken });

const getForYouRandomProducts = (sourceToken?: CancelToken) =>
  instance.get("/products/for-you-products/random_products", {
    cancelToken: sourceToken,
  });

const getPromotionRandomProducts = (sourceToken?: CancelToken) =>
  instance.get("/products/promotions/random_products", {
    cancelToken: sourceToken,
  });
const getFavoriteProducts = (token:string,sourceToken?: CancelToken) =>
  instance.get(`/products/favorite/`, {
    cancelToken: sourceToken,
    headers: {'Authorization':`Bearer ${token}`},
  });

const endpoints = {
  getProducts,
  getProductsById,
  getFilteredProducts,
  getProductBestSellers,
  getForYouRandomProducts,
  getPromotionRandomProducts,
  getFavoriteProducts
};
export default endpoints;
