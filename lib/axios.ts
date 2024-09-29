import axios from "axios";

export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api"
    : "https://api.edu-fiche.fr/api";
export const API_VERSION = "v1";
export const fullApiUrl = `${API_URL}/${API_VERSION}`;

const apiClient = axios.create({
  baseURL: fullApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
