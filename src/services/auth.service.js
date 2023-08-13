import axios from "axios";

const API_URL = "http://localhost:8080/user/";

const register = (role,name, username, email, password) => {
    return axios.post(API_URL + "register", {
      role,
      name,
      username,
      email,
      password,
    });
  };

  const login = (email, password) => {
    return axios
      .post(API_URL + "login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };
  const logout = () => {
    localStorage.removeItem("user");
  };
// eslint-disable-next-line
  export default{
    register,
    login,
    logout,
  }
  