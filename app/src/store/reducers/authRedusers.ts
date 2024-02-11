import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import { api } from "../../api";

export const loginAsync = createAsyncThunk(
    'auth/login',
    async ({ username, password }: { username: string; password: string }, { signal }) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => source.cancel('Operation canceled by the user.'));
        const response = await api.login(username, password, source.token);
        try{
            const cart = await api.createCart(response.data.user_id)
        }
        catch{
        }
        return response.data;
    }
);

export const registerAsync = createAsyncThunk(
    'auth/register',
    async ({ username, email, password, confirm_password }: { username: string; email: string, password: string, confirm_password: string }) => {
        const response = await api.register(username, email, password, confirm_password);
        try{
            const cart = await api.createCart(response.data.user_id)
        }
        catch{
        }
        return response.data;
    }
);