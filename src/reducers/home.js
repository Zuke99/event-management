
import { EVENTREGISTRATIONFAILED, EVENTREGISTRATIONSUCCESS, GET_EVENT_SUCCESS, SET_MESSAGE } from "../actions/type";

const initialState = [];

export default function homeReducer (state = initialState, action) {
    console.log("homeREducxer", action.type)
    switch (action.type){
        case GET_EVENT_SUCCESS:
            return action.payload;
        case SET_MESSAGE:
            return action.payload;
        default:
            return state;
    }
}

