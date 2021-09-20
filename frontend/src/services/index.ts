import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URI || "http://localhost:8000",
  timeout: 2000,
  headers: {},
});
