import { CancelToken } from 'axios';
import { instance } from './index'
import { Categories, ProductData, ShopData } from 'types/types';
import { ReviewsData, Reviews } from 'store/models/ReviewTypes';
import accessToken from 'service';


const getReviews = (limit: number = 10, offset: number = 0, sourceToken?: CancelToken) =>
    instance.get<ReviewsData>(`/review/`, {
        params: {
            limit: limit,
            offset: offset,
        },
        cancelToken: sourceToken
    });

const getReviewById = (id: number, sourceToken?: CancelToken) =>
    instance.get<Reviews>(`/review/${id}`, {
        cancelToken: sourceToken
    });

const addReview = (disadvantages?: string, advantages?: string, user?: number, product?: number, text?: string, stars?: number, sourceToken?: CancelToken) =>
    instance.post(`/products/review/`, { user, product, text, stars, advantages, disadvantages }, {
        cancelToken: sourceToken, headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

const updateReview = (id?: number, user_id?: number, product_id?: number, text?: string, stars?: number, sourceToken?: CancelToken) =>
    instance.put(`/review/${id}`, { user_id, product_id, text, stars }, { cancelToken: sourceToken });

const deleteReview = (id?: number, sourceToken?: CancelToken) =>
    instance.put(`/review/${id}`, { cancelToken: sourceToken });


const endpoints = {

    getReviews,
    getReviewById,
    addReview,
    updateReview,
    deleteReview,
};
export default endpoints;
