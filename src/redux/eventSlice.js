import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createAuthenticatedAxios } from "./axiosAuth";

const API_URL = "http://localhost:8080/"

export const addEvent = createAsyncThunk("addEvent", async (data, {rejectWithValue}) => {
    try{
        const authenticatedAxios = createAuthenticatedAxios();
        const response = await authenticatedAxios.post(API_URL + "event", data);
        if(response.data.status === true){
            return response.data;
        } else {
            return response.data;
        }

    } catch(error){
        return rejectWithValue(error.response.data)
    }
})


const eventSlice = createSlice({
    name : 'event',
    initialState : {
        events : [],
        loading : false,
        error : null,
        eventMessage: ""
    },
    extraReducers:{
        [addEvent.pending] : (state) => {
            state.loading = true;
        },
        [addEvent.fulfilled] : (state, action) => {
            state.loading = false;
            state.eventMessage = action.payload.message;
            state.events.push(action.payload);
        },
        [addEvent.rejected] : (state, action) => {
            state.loading = false;
            state.eventMessage = action.payload.message;
        }

    }

})

export default eventSlice.reducer;