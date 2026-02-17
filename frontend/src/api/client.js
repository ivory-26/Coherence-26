import axios from "axios";

const API_BASE_URL = import.meta.env.PROD
  ? "https://coherence-26-is6m.onrender.com"
  : "";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export { API_BASE_URL };
export default apiClient;
