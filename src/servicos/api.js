import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/autenticacao",
});

export default api;
