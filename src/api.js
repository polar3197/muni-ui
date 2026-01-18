import axios from 'axios';

const api = axios.create({
  baseURL: 'https://putting-remark-lodging-normally.trycloudflare.com',
  timeout: 10000,
});

export default api;