import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthenticatedAxios } from "../axiosAuth";

//Action
/*export const fetchEvents = createAsyncThunk('fetchEvents', async () => {
    const response = await fetch('http://localhost:8083/event');
    return response.json();
});*/

const API_URL = 'http://localhost:8080/event';

const authenticatedAxios = createAuthenticatedAxios();
export const fetchEvents = createAsyncThunk('fetchEvents', async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get(API_URL);
        console.log("EventSlice ", response);
        if(response.data.status === true){
        return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    } catch (err) {
        return rejectWithValue(err);
    }
})


export const approveEvent = createAsyncThunk('approveEvent', async(data,{rejectWithValue}) => {
    try{
        const response = await authenticatedAxios.put(API_URL + "/approval/approveevent",data);
        if(response.data.status === true){
            return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }
    }  catch (err) {
        return rejectWithValue(err);
    }
})

export const getCategories = createAsyncThunk('getCategories', async(_,{rejectWithValue}) => {
    try{
        const response = await authenticatedAxios.get("http://localhost:8080/category");
        return response.data;
    } catch (err) {
        return rejectWithValue(err);
    }

})


const eventSlice = createSlice({
    name : 'events',
    initialState : {
        isLoading: true,
        data: null,
        isError: false,
        about : false,
        message : "",
        categories : []
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

        builder.addCase(approveEvent.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(approveEvent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        });

        builder.addCase(approveEvent.rejected, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
        })
        
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        })

        builder.addCase(getCategories.fulfilled, (state,action) => {
            state.isLoading = false;
            state.categories = action.payload.data;
        })
       

        

    }
});

export default eventSlice.reducer;