import { createSlice } from '@reduxjs/toolkit';
import { fetchBanners } from 'store/reducers/BannerReducesr';
// import { Banner } from 'store/models/BannersType';

interface BannerState {
    data: any[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: BannerState = {
    data: [{
        description: "Передовая камера с разрешением 200 Мп и оптической стабилизацией изображения 120 Вт, быстрая зарядка HyperCharge AMOLED-дисплей 120 Гц",
        id: 1,
        image: "https://bee.webtm.ru/media/banners/bc360944412d8b013db900c0451ff18c.png",
        title: "Redmi Note 12 Pro+ 37 990 с",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }],
    status: 'idle',
    error: null,
    laoding: false
};
const BannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBanners.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchBanners.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload);
                
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