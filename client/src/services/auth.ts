import { RegisterType } from '../types/types';
import instance from './instance';

const BASE_URL = `/api/user`;

const authService = {
  register: async (payload: RegisterType) => {
    try {
      const { data } = await instance.post(`${BASE_URL}/register`, payload);

      return data;
    } catch (err) {
      console.log(err);
    }
  },
  login: async (payload: Pick<RegisterType, 'email' | 'password'>) => {
    try {
      const { data } = await instance.post(`${BASE_URL}/login`, payload);

      if (data?.data) {
        localStorage.setItem('tradeToken', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }

      return data.data.user;
    } catch (err) {
      console.log(err);
    }
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tradeToken');
    localStorage.removeItem('tradeTheme');
  },
  balanceUpdate: async () => {
    const { data } = await instance.get(`${BASE_URL}/currentUser`);

    return data;
  },
};

export default authService;
