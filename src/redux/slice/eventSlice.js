import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Action
/*export const fetchEvents = createAsyncThunk('fetchEvents', async () => {
    const response = await fetch('http://localhost:8083/event');
    return response.json();
});*/

const API_URL = 'http://localhost:8080/event';

export const fetchEvents = createAsyncThunk('fetchEvents', async () => {
    try {
        const response = await axios.get(API_URL);
        console.log("EventSlice ", response);
        return response.data;
    } catch (err) {
        return err.message;
    }
})

const eventSlice = createSlice({
    name : 'events',
    initialState : {
        isLoading: true,
        data: null,
        isError: false,
    },
    extraReducers : (builder) => {
        builder.addCase(fetchEvents.pending, (state,action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchEvents.fulfilled, (state,action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchEvents.rejected, (state,action) => {
            console.log("Error",action.payload);
            state.isError = true;
        });
    }
});

export default eventSlice.reducer;