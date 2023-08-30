
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAuthenticatedAxios } from "./axiosAuth";

const API_URL = "http://localhost:8080/user/"
//create Action

export const registerUser = createAsyncThunk("registerUser", async (data, {rejectWithValue}) => {
    try{
    const response = await axios.post(API_URL+"register", data);
    if(response.data.status === true){
        return response.data;
    } else {
        return rejectWithValue(response.data.message);
    }
    
    } catch (error){
        return rejectWithValue(error.response.data)
    }
});

export const loginUser = createAsyncThunk("loginUser", async (data, {rejectWithValue}) => {
    try{
        const response = await axios.post(API_URL+"login", data);
        console.log("login response", response.data);
        if(response.data.status === true){
            return response.data;
        } else {
            return rejectWithValue(response.data.message);
        }

    } catch (error){
        return rejectWithValue(error.response.data)
    }
})
    export const isLoggedIn = createAsyncThunk("isLoggedIn", async(_, {rejectWithValue})=>{

        try{
            const authenticatedAxios = createAuthenticatedAxios();
            const response = await authenticatedAxios.get(API_URL+"test");
            console.log("isLoggedIN SLice", response);
            if(response.data.status === true){
            return response.data.message;
            } else {
                return rejectWithValue(response.data.message);
            }
        } catch (error){
            return rejectWithValue(error.response.data)
        }
    })

    export const role = createAsyncThunk("role", async(_,{rejectWithValue}) =>{
        try{
            const authenticatedAxios = createAuthenticatedAxios();
            const response = await authenticatedAxios.get(API_URL+"role");
            if(response.data.status === true){
                return response.data;
            } else {
                return rejectWithValue(response.data.result);
            }
        } catch (error){
            return rejectWithValue(error.response.data)
        }
    })

    export const userDetails = createAsyncThunk("userDetails", async(_,{rejectWithValue}) =>{
        try{
            const authenticatedAxios = createAuthenticatedAxios();
            const response = await authenticatedAxios.get(API_URL+"details");
            if(response.data.status === true){
                return response.data;
            } else {
                return rejectWithValue(response.data);
            }
        }catch (error){
            return rejectWithValue(error.response.data)
        }
    })

const userDetail = createSlice({
    name : 'user',
    initialState : {
        users: [],
        loading: false,
        error : null,
        loginMessage : "",
        registerMessage : "",
        loggedInMessage : "",
        role : 0,
        name : "",
        email : "",
        id:"",

    },
    extraReducers: {
        [registerUser.pending] : (state) => {
            state.loading = true; 
        },
        [registerUser.fulfilled] : (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
            state.registerMessage = action.payload;

        },
        [registerUser.rejected] : (state, action) => {
           
            state.loading = true; 
            state.registerMessage = action.payload;
        },


        [loginUser.pending] : (state) => {
            state.loading = true; 
        },
        [loginUser.fulfilled] : (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
            state.loginMessage = action.payload.message;

        },
        [loginUser.rejected] : (state, action) => {
            state.loading = true; 
            state.loginMessage = action.payload;
        },

        [isLoggedIn.pending] : (state) => {
            state.loading = true; 
        },
        [isLoggedIn.fulfilled] : (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
            state.loggedInMessage = action.payload.message;

        },
        [isLoggedIn.rejected] : (state, action) => {
            state.loading = true; 
            state.loggedInMessage = action.payload;
        },


        [userDetails.pending] : (state) => {
            state.loading = true; 
        },
        [userDetails.fulfilled] : (state, action) => {
            console.log("PAYLOAD",action.payload)
            state.loading = false;
            state.users.push(action.payload);
            state.loggedInMessage = action.payload.message;
            state.name= action.payload.data.name;
            state.email= action.payload.data.email;
            state.id = action.payload.data._id;
            

        },
        [userDetails.rejected] : (state, action) => {
            state.loading = true; 
            state.loggedInMessage = action.payload;
        }
    }
})


export default userDetail.reducer;