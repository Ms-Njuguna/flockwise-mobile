import axios from "axios";

const BASE_URL = "http://192.168.100.7:8000/api";

export const registerUser = (data) =>
  axios.post(`${BASE_URL}/register/`, data);

export const loginUser = (data) =>
  axios.post(`${BASE_URL}/login/`, data);