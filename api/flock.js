import axios from "axios";

const BASE_URL = "http://192.168.100.7:8000/api"; // 🔥 replace IP

export const createFlock = async (data) => {
  const res = await axios.post(`${BASE_URL}/flock/`, data);
  return res.data;
};

export const fetchFlock = async () => {
  const res = await axios.get(`${BASE_URL}/flock/`);
  return res.data;
};