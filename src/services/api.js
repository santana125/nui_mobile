import axios from 'axios';

const api = axios.create({
  baseURL: "https://nui-api.herokuapp.com",
});

export default api;
