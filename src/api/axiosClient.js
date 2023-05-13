import axios from "axios";

// `http://192.168.43.237:4940/`;
let baseURL = "https://gobadelivery-v1.onrender.com/";
// let baseURL = "http://192.168.1.131:4940/";

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.response;
  }
);

export default axiosClient;
