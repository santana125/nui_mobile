import axios from 'axios';

const api = axios.create({
  baseURL: "http://192.168.2.125:5001",
});

export default api;
