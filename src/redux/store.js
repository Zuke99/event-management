import {configureStore } from "@reduxjs/toolkit";
import userDetail from "./userSlice";
import eventSlice from "./eventSlice";

export const store = configureStore({
    reducer : {
        app : userDetail,
        event : eventSlice,
    }
})