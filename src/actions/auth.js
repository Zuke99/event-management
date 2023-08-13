import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./type";
  import AuthService from "../services/auth.service";

  export const register = (role,name,username, email, password) => (dispatch) => {
    return AuthService.register(role,name,username, email, password).then(
      (response) => {
        if(response.data.status !== false){
        dispatch({
          type: REGISTER_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
        
        return Promise.resolve();
      } else {
        const message = response.data.message;
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject(message);
      }
    );
  };
  export const login = (email, password) => (dispatch) => {
    return AuthService.login(email, password).then(
      (data) => {
        if(!data.success === false){
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
          
        });
        console.log("Logged in", data);
        return Promise.resolve();
      } else {
        const message =data.msg;
       
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject(data.msg);
      }
      },
      (error) => {
        const message =error.response.data.msg;
       
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject(message);
      }
    );
  };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };