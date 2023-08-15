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

  const login = async (email, password) => {
     return  await axios
      .post  (API_URL + "login", {
        email,
        password,
      })
      .then( (response) => {
         if (response.data.success === true) {
            localStorage.setItem("user", JSON.stringify(response.data.data.data));
         }
        return response;
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
  