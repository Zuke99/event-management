import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import homeReducer from "./home";

export default combineReducers({
  auth,
  message,
  homeReducer
});