import axios from "axios";

export const askAI = async (question) => {
  const res = await axios.post("http://192.168.100.7:8000/api/ai/", {
    question,
  });
  return res.data;
};