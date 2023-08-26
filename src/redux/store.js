import {configureStore } from "@reduxjs/toolkit";
import userDetail from "./userSlice";

export const store = configureStore({
    reducer : {
        app : userDetail,
    }
})