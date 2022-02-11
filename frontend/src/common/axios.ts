import axios from "axios";

export const isProduction = process.env.NODE_ENV == "production";

export const endpoint = isProduction
  ? "api.resource-monitor.findy.co.kr:444"
  : "localhost:8000";

const baseURL = `${isProduction ? "https" : "http"}://${endpoint}/api/`;

const axiosClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

export const authClient = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

export const updateToken = (access: string) => {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${access}`;
};

export default axiosClient;
