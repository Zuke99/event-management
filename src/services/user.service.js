import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/user/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = async () => {
  return await axios.get(API_URL + "role", { headers: authHeader() })
  .then((response) => {
    return response;
  })
  ;
};

const isLoggedIn = async() => {
  return await axios.get(API_URL + "loggedin", {headers:authHeader()})
  .then((response) => {
    return response;
  })
}
// eslint-disable-next-line
export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  isLoggedIn,
};