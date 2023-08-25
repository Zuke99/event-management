import axios from "axios";

const API_URL="http://localhost:8080/event";
const getEvent = () => {
    return axios.get(API_URL);
}

const eventRegister = (event_id) =>{
    return axios.post(API_URL+"/registerevent",{
        event_id
    });
}

// eslint-disable-next-line
export default{
    getEvent,
    eventRegister
}