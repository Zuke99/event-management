import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Action
export const fetchEvents = createAsyncThunk('fetchEvents', async () => {
    const response = await fetch('http://localhost:8080/event');
    return response.json();
});

const eventSlice = createSlice({
    name : 'events',
    initialState : {
        isLoading: false,
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