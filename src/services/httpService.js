import logout from "@/functions/logout";
import axios from "axios";
import Cookies from "js-cookie";

const https = require("https");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  httpsAgent: agent,
});

app.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

app.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalConfig = err.config;
    if (err.response && err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const token = Cookies.get("token");
      token
        ? (err.response.headers.Authorization = `Bearer ${token}`)
        : logout();
    }
    return Promise.reject(err);
  }
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

export default http;
