import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cemetery-blackjack-environments-matching.trycloudflare.com',
  timeout: 10000,
});

export default api;