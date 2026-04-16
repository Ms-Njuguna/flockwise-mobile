import axios from "axios";

const BASE_URL = "http://192.168.100.7:8000/api";

export const fetchEggs = async () => {
  const res = await axios.get(`${BASE_URL}/eggs/`);
  return res.data;
};

export const fetchBirdSales = async () => {
  const res = await axios.get(`${BASE_URL}/bird-sales/`);
  return res.data;
};

export const fetchExpenses = async () => {
  const res = await axios.get(`${BASE_URL}/expenses/`);
  return res.data;
};