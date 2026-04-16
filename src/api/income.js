import { api } from "./base";

export const fetchEggs = () => api.get("/eggs/").then(r => r.data);
export const fetchBirdSales = () => api.get("/bird-sales/").then(r => r.data);

export const createEggRecord = (data) =>
  api.post("/eggs/", data).then(r => r.data);

export const createBirdSale = (data) =>
  api.post("/bird-sales/", data).then(r => r.data);