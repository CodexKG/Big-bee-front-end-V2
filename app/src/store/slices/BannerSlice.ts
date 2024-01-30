import {  createSlice } from '@reduxjs/toolkit';
import { fetchBanners } from 'store/reducers/BannerReducesr';
// import { Banner } from 'store/models/BannersType';

interface BannerState {
    data: any[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: BannerState = {
    data: [],
    status: 'idle',
    error: null,
    laoding: false
};
const BannerSlice = createSlice({
    name:'banner',
    initialState,
    reducers:{

    },
    extraReducers: (builder)=>{
        builder
            .addCase(fetchBanners.pending, (state)=>{
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchBanners.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.data = action.payload;
                state.laoding = false
            })
            .addCase(fetchBanners.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch banner' : 'Failed to fetch banner';
                state.laoding = false
            })
    }
})
export default BannerSlice.reducer;