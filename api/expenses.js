import axios from "axios";

const BASE_URL = "http://192.168.100.7:8000/api"; // 🔥 replace with your IP

export const createExpense = async (data) => {
  const res = await axios.post(`${BASE_URL}/expenses/`, data);
  return res.data;
};

export const fetchExpenses = async () => {
  const res = await axios.get(`${BASE_URL}/expenses/`);
  return res.data;
};