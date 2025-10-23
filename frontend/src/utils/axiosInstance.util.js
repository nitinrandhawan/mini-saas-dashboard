import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://13.233.17.57:5000/",
  withCredentials: true,
});
