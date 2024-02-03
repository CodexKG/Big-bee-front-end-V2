import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api";

export const getEmailAsync = createAsyncThunk(
    'get_emails',
    async ({ email }: { email: string; }) => {
        const response = await api.getEmail(email);
        return response.data;
    }
);