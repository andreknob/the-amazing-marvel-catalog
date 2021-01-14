import axios from 'axios';

const api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public',
  headers: {
    common: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  },
});

export default api;
