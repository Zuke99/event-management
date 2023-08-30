import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const viewEvent = createAsyncThunk('viewEvent', async(data,{rejectWithValue})=>{
    try{
        console.log("ViewEventSlice", data);
        return data;
    }catch (err) {
        return rejectWithValue(err);
    }
})
const viewEventSlice = createSlice({
    name : 'events',
    initialState : {
        isLoading: true,
        data: null,
        isError: false,
    },
    extraReducers : (builder) => {
        builder.addCase(viewEvent.pending, (state,action) => {
            state.isLoading = true;
        });
        builder.addCase(viewEvent.fulfilled, (state,action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(viewEvent.rejected, (state,action) => {
            console.log("Error",action.payload);
            state.isError = true;
        });
    }
})

export default viewEventSlice.reducer;