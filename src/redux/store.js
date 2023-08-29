import {configureStore } from "@reduxjs/toolkit";
import userDetail from "./userSlice";
import eventSlice from "./slice/eventSlice";

export const store = configureStore({
    reducer : {
        app : userDetail,
        event: eventSlice
    }
});