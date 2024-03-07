import { api } from "../../api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CancelToken } from "axios";
import { SettingsType } from "store/models/SettingsType";

export const fetchSettings = createAsyncThunk<SettingsType, { cancelToken?: CancelToken }, { rejectValue?: string }>(
    'settings/fetchSettings',
    async ({ }, { rejectWithValue }) => {
        try {
            const response = await api.getSettings();
            return response.data;
        } catch (error) {
            return rejectWithValue(typeof error === 'string' ? error : 'Failed to fetch cart items');
        }
    }
);