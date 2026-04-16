import { api } from "./base";

export const askAI = (question, context) =>
  api.post("/ai/", { question, context }).then(r => r.data);