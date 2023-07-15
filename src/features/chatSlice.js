import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "",
    error: "",
    conversations: [],
    activeConversation: {},
    notificatoins: []
};

export const getConversations = createAsyncThunk(
    "conervsation/all",
    async (token, { rejectWithValue }) => {
        try {
            const { data } = await axios.get('/conversation', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        }
    }
);


export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setActiveConversations: (state, action) => {
            state.activeConversation = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getConversations.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getConversations.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.conversations = action.payload;
        })
        .addCase(getConversations.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    },
});

export const { setActiveConversations } = chatSlice.actions;
export default chatSlice.reducer;