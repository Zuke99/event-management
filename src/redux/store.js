import {configureStore } from "@reduxjs/toolkit";
import userDetail from "./userSlice";
import addEventSlice from "./eventSlice";
import eventSlice from "./slice/eventSlice";
import viewEventSlice from "./slice/viewEventSlice";
import registerEventSlice from "./slice/registerEventSlice"

export const store = configureStore({
    reducer : {
        app : userDetail,
        event : eventSlice,
        add_event : addEventSlice,
        viewEvent : viewEventSlice,
        registerEvent : registerEventSlice
    }
});