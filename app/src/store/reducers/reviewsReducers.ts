import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { Reviews, ReviewsData, AddReview } from "../../store/models/ReviewTypes";
import { api } from "../../api";

export const fetchAddReview = createAsyncThunk<AddReview, { user_id?: number, product_id?: number, text?: string, stars?: number, term_of_use?: string, disadvantages?: string, advantages: string, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'review/fetchAddReview',
    async ({ cancelToken, user_id, product_id, text, stars, disadvantages, advantages }, { rejectWithValue }) => {
        try {
            const response = await api.addReview(disadvantages, advantages, user_id, product_id, text, stars, cancelToken);
            return response.data as AddReview;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);

export const fetchReviews = createAsyncThunk<ReviewsData, { limit?: number, offset?: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'review/fetchReviews',
    async ({ limit, offset, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.getReviews(limit, offset, cancelToken);
            return response.data as ReviewsData;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);

export const fetchReviewById = createAsyncThunk<Reviews, { id: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'review/fetchReviewById',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.getReviewById(id);
            return response.data as Reviews;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);

export const fetchUpdateReview = createAsyncThunk<Reviews, { id: number, user_id?: number, product_id?: number, text?: string, stars?: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'review/fetchUpdateReview',
    async ({ id, user_id, product_id, text, stars, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.updateReview(id, user_id, product_id, text, stars, cancelToken);
            return response.data as Reviews;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);

export const fetchDeleteReview = createAsyncThunk<Reviews, { id: number, cancelToken?: CancelToken }, { rejectValue?: string }>(
    'review/fetchDeleteReview',
    async ({ id, cancelToken }, { rejectWithValue }) => {
        try {
            const response = await api.deleteReview(id, cancelToken);
            return response.data as Reviews;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch products');
        }
    }
);