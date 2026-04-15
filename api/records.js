import axios from "axios";

const BASE_URL = "http://192.168.100.7:8000/api/records/"; // 🔥 replace with your IP

export const fetchRecords = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createRecord = async (data) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};