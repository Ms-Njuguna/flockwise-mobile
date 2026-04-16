import axios from "axios";

const BASE_URL = "http://192.168.100.7:8000/api"; // 🔥 replace IP

export const createEggRecord = async (data) => {
  const res = await axios.post(`${BASE_URL}/eggs/`, data);
  return res.data;
};

export const createBirdSale = async (data) => {
  const res = await axios.post(`${BASE_URL}/bird-sales/`, data);
  return res.data;
};