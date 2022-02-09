import axios from "axios";

export const isProduction = process.env.NODE_ENV == "production";

export const endpoint = isProduction
  ? "api.resource-monitor.findy.co.kr:444"
  : "localhost:8000";

const axiosClient = axios.create({
  baseURL: `${isProduction ? "https" : "http"}://${endpoint}/api/`,
  timeout: 5000,
});

export default axiosClient;
