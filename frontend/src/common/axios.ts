import axios from "axios";

export const endpoint =
  process.env.NODE_ENV == "production"
    ? "182.225.15.97:31234"
    : "localhost:8000";

const axiosClient = axios.create({
  baseURL: `http://${endpoint}/api/`,
  timeout: 5000,
});

export default axiosClient;
