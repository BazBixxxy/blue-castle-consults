import axios from "axios";
import { baseURL } from "./baseURL";

// 🔹 Global defaults
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.timeout = 10 * 1000;
axios.defaults.withCredentials = true;

// 🔹 Public axios instance
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

// 🔹 Private axios instance
export const axiosPrivate = axios.create({
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});
