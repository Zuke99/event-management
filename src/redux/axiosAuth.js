import axios from "axios";

// This function creates an instance of Axios with dynamic headers
export const createAuthenticatedAxios = () => {
  const token = localStorage.getItem("user");
  
  // You can check if the token is valid here before using it
  // ...

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      Authorization: token
    }
  });
//   console.log("axiosInstance headers:", axiosInstance.defaults.headers);
  return axiosInstance;
};

// Usage example
//  const authenticatedAxios = createAuthenticatedAxios();

// // Now you can use authenticatedAxios for your requests
// authenticatedAxios.get("/some-endpoint")
//   .then(response => {
//     // Handle response
//   })
//   .catch(error => {
//     // Handle error
//   });
