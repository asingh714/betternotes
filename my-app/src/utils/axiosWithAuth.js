import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://better--note.herokuapp.com/api",
    headers: {
      authorization: token,
      "Access-Control-Allow-Origin": "https://betternote.netlify.app",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length",
      "Access-Control-Allow-Credentials": "true",
    },
  });
};
