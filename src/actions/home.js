import { GET_EVENT_SUCCESS,  SET_MESSAGE, EVENTREGISTRATIONFAILED, EVENTREGISTRATIONSUCCESS } from "./type";
import HomeService from "../services/home.service";

export const getEvent =()=> async(dispatch) =>{
    return await HomeService.getEvent().then(
        (response) => {
            //console.log("resposnse",response.status);
            dispatch({
                type:GET_EVENT_SUCCESS,
                payload : response.data
            })

            dispatch({
                type : SET_MESSAGE,
                payload : response.data
            })
        }
    )
}

export const eventRegister = (event_id) => async(dispatch) => {
    return await HomeService.eventRegister(event_id).then(
        (response) =>{
            console.log("resposnse",response.data.success);
            if(response.data.success === true){
                dispatch({
                    type: EVENTREGISTRATIONSUCCESS,
                });

                dispatch({
                    type : SET_MESSAGE,
                    payload: "HEllo payload"
                })
                return Promise.resolve();
            } else {
                console.log("else", response.data.message)
                const message = "Hello"
                dispatch({
                    type : EVENTREGISTRATIONFAILED,
                    payload : "Failed"
                })

                dispatch({
                    type : SET_MESSAGE,
                    payload: "hello"
                });
                //return Promise.reject();
            }
            
        }, (error) => {
            const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: EVENTREGISTRATIONFAILED,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject(message);
        }
    )
}