import { CancelToken } from 'axios';
import { instance } from './index'
import { Categories, ProductData, ShopData } from 'types/types';
import { ReviewsData, Reviews } from 'store/models/ReviewTypes';


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

const addReview = (user_id?: number, product_id?: number, text?: string, stars?: number, sourceToken?: CancelToken) =>
    instance.post(`/review/`, { user_id, product_id, text, stars }, { cancelToken: sourceToken });

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
