import { ADDEVENTFAIL, ADDEVENTSUCCESS, SET_MESSAGE } from "./type";
import EventService from "../services/event.service";

export const addEvent = (name, description, seats, category, posterImage, date, start_time, end_time, venue, about, tags, organisation) => (dispatch) => {
    return EventService.addEvent(name, description, seats, category, posterImage, date, start_time, end_time, venue, about, tags, organisation).then(
        (response) => {
            console.log("resposnse",response);
            dispatch({
                type:ADDEVENTSUCCESS,
            });

            dispatch({
                type:SET_MESSAGE,
                payload: response.data.message
            });

        },
        (error) => {
            const message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
      
            dispatch({
              type: ADDEVENTFAIL,
            });
      
            dispatch({
              type: SET_MESSAGE,
              payload: message,
            });
      
            return Promise.reject(message);
          }
    );
};