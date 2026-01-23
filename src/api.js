import axios from 'axios';

const api = axios.create({
  baseURL: 'https://active-guided-couple-with.trycloudflare.com',
  timeout: 10000,
});
export default api;