import axios from "axios";

const BACKEND_URL = (process.env.REACT_APP_BACKEND_URL || "").replace(/\/$/, "");
export const API = BACKEND_URL ? `${BACKEND_URL}/api` : "/api";

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const sendContactMessage = (payload) =>
  api.post("/contact", payload).then((r) => r.data);

export const inboxLogin = (password) =>
  api.post("/inbox/auth", { password }).then((r) => r.data);

export const fetchMessages = (token) =>
  api.get("/contact", { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data);

export const resumePdfUrl = `${API}/resume/pdf`;

export const TOKEN_KEY = "inbox_token";
