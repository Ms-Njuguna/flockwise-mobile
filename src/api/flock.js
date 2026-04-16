import { api } from "./base";

export const fetchFlock = () => api.get("/flock/").then(r => r.data);

export const createFlock = (data) =>
  api.post("/flock/", data).then(r => r.data);