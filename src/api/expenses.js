import { api } from "./base";

export const fetchExpenses = () => api.get("/expenses/").then(r => r.data);

export const createExpense = (data) =>
  api.post("/expenses/", data).then(r => r.data);