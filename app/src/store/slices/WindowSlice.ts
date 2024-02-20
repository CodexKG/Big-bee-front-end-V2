import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SettingsType } from 'store/models/SettingsType';
import { FilterParams } from 'store/models/WindowTypes';
import { fetchSettings } from 'store/reducers/settingsReducers';
interface windowState {
    user: any
    filters: FilterParams;
    settings: SettingsType,
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    loading: boolean
}

const initialState: windowState = {
    user: {},
    filters: {
        limit: 20,
        offset: 0,
        category: 0,
        attribute: []
    },
    settings: {
            id: 1,
            title: "BigBee",
            description: "BigBee - Marketplace",
            logo: "https://bee.webtm.ru/media/logo/logo.32d00f413f33e858aaa1267182250079.png",
            phone: "0772343206",
            instagram: "https://www.instagram.com/neobis.club/",
            telegram: "https://www.t.me/@Toktorov",
            whatsapp: "https://www.wa.me/+996772343206",
            tiktok: "https://www.tiktok.com/@codex_kg"
        },
    status: 'idle',
    loading: false

};


const windowSlice = createSlice({
    name: 'window',
    initialState,
    reducers: {
        setParams: (state, action: PayloadAction<FilterParams>) => {
            state.filters = action.payload
        },
        setFilters: (state, action: PayloadAction<FilterParams>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setAtribute: (state, action: PayloadAction<FilterParams>) => {
            state.filters.attribute = { ...state.filters.attribute, ...action.payload };
        },
        addAttribute: (state, action: PayloadAction<{ key: string, value: string }>) => {
            const isDuplicate = state.filters.attribute.some((item: any) =>
                item.key === action.payload.key && item.value === action.payload.value
            );
            if (!isDuplicate) {
                state.filters.attribute.push(action.payload);
            }
        },
        removeValue: (state, action: PayloadAction<{ key: string; value: string }>) => {
            // Фильтруем массив, удаляя только тот атрибут, который полностью соответствует ключу и значению
            state.filters.attribute = state.filters.attribute.filter((item: any) =>
                item.key !== action.payload.key || item.value !== action.payload.value
            );
        },
        clearFilters: (state, action: PayloadAction<{ id: number }>) => {
            state.filters = {
                limit: 20,
                offset: 0,
                category: action.payload.id,
                attribute: []
            }
        },
        setOffset: (state, action: PayloadAction<number>) => {
            state.filters.offset = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.settings = action.payload
                state.loading = false
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.loading = false
            })
    },

});

export const { setFilters, clearFilters, setOffset, setAtribute, addAttribute, removeValue, setParams } = windowSlice.actions;


export default windowSlice.reducer;
