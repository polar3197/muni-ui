import axios from 'axios';

const api = axios.create({
  baseURL: 'https://regards-pregnancy-label-justify.trycloudflare.com',
  timeout: 10000,
});

export default api;