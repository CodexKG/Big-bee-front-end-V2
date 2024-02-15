import { CancelToken } from "axios";
import { instance } from "./index";
import { ProductData, SingleProduct } from "types/types";
import { FilterParams } from "store/models/WindowTypes";
import { getCookie } from "helpers/cookies";
import accessToken from "service";

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

const getFilteredProducts = (filters: string, sourceToken?: CancelToken) =>
  instance.get<ProductData>(`/products/products/${filters}`, {
    cancelToken: sourceToken,
  });

const getProductsById = (id: number, sourceToken?: CancelToken) =>
  instance.get<SingleProduct>(`/products/products/${id}`, {
    cancelToken: sourceToken,
  });

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

const getProductsofDay = (sourceToken?: CancelToken) =>
  instance.get(`/products/product_day`, { cancelToken: sourceToken });

const getFavoriteProducts = (sourceToken?: CancelToken) =>
  instance.get(`/products/favorite/`, {
    cancelToken: sourceToken,
    headers: { Authorization: `Bearer ${getCookie("access_token")}` },
  });

const endpoints = {
  getProducts,
  getProductsById,
  getFilteredProducts,
  getProductBestSellers,
  getFavoriteProducts,
  getForYouRandomProducts,
  getPromotionRandomProducts,

  getProductsofDay,
};
export default endpoints;
