import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "http://localhost:5000/api",
    // baseURL: "https://todo-api3.herokuapp.com/api",
    headers: {
      Authorization: token,
    },
  });
};
