import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAuthenticatedAxios } from "../axiosAuth";

const API_URL = "http://localhost:8080/event/"


export const registerEvent = createAsyncThunk('registerEvent', async(data,{rejectWithValue}) =>{
    try{
        const authenticatedAxios = createAuthenticatedAxios();
        const response = await authenticatedAxios.post(API_URL+"registerevent", data);
        console.log("registerEvent Slice response ", response);
        return response.data;
    } catch (err) {
        return rejectWithValue(err);
    }
})

const registerEventSlice = createSlice({
    name : "registerEvent",
    initialState : {
        isLoading : true,
        message : "",
        isError : "",
    },
    extraReducers : (builder) => { 
        builder.addCase(registerEvent.pending, (state) => {
            state.isLoading = true
        });
        builder.addCase(registerEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        });
        builder.addCase(registerEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload
            state.err = action.payload
        })
    }
})

export default registerEventSlice.reducer;