import { createAsyncThunk } from "@reduxjs/toolkit";

import { CancelToken } from "axios";
import { Banner } from "store/models/BannersType";
import { api } from "../../api/";


export const fetchBanners = createAsyncThunk<any, { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'baner/fetchBanners',
    async ({cancelToken},{ rejectWithValue }) => {
        try {
            const response = await api.getBanners(cancelToken); 
            return response.data;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Не нашли баннеры');
        }
    }
);