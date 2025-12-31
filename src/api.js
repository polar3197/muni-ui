import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quote-boxes-featured-other.trycloudflare.com',
  timeout: 10000,
});

export default api;