import axios from "axios";

const axiosClient = axios.create({
  baseURL: `http://${
    process.env.NODE_ENV == "production"
      ? "182.225.15.97:31234"
      : "localhost:8000"
  }/api/`,
  timeout: 2000,
});

console.log(process.env);

export default axiosClient;
