import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pentium-fraser-hobbies-entire.trycloudflare.com',
  timeout: 10000,
});
export default api;