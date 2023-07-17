import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: "",
    error: "",
    conversations: [],
    activeConversation: {},
    messages: [],
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

export const open_create_conversation = createAsyncThunk(
    "conervsation/open_create",
    async (values, { rejectWithValue }) => {
        const { token, receiver_id } = values;
        try {
            const { data } = await axios.post('/conversation', { receiver_id }, {
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

export const getConversationMessages = createAsyncThunk(
    "conervsation/messages",
    async (values, { rejectWithValue }) => {
        const { token, convo_id } = values;
        try {
            const { data } = await axios.get( `/message/${convo_id}`, {
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
            .addCase(open_create_conversation.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(open_create_conversation.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.activeConversation = action.payload;
            })
            .addCase(open_create_conversation.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getConversationMessages.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getConversationMessages.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.messages = action.payload;
            })
            .addCase(getConversationMessages.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    },
});

export const { setActiveConversations } = chatSlice.actions;
export default chatSlice.reducer;