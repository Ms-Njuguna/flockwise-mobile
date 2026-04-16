import axios from "axios";

const BASE_URL = "http://192.168.100.7:8000/api";

export const registerUser = async (data) => {
  const res = await axios.post(`${BASE_URL}/register/`, data);
  return res.data;
};