import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('tradeToken') ?? ''}`,
  },
});

export default instance;
