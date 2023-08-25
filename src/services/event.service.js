import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/event/";
const token=authHeader();
const addEvent = (name, description, seats, category, posterImage, date, start_time, end_time, venue, about, tags, organisation) => {
    return axios.post(API_URL, {
        name, description, seats, category, posterImage, date, start_time, end_time, venue, about, tags, organisation
    }, {
        headers: {
            Authorization: token.authorization // Access the authorization property
        }
    });
};

// eslint-disable-next-line
export default{
    addEvent
}

