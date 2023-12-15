import { TradeType } from '../types/types';
import instance from './instance';

const BASE_URL = `/api/trade`;

const tradeService = {
  pocket: async () => {
    try {
      const { data } = await instance.get(`${BASE_URL}`);

      return data.data;
    } catch (err) {
      console.log(err);
    }
  },
  sellCoin: async (payload: TradeType) => {
    try {
      const { data } = await instance.post(`${BASE_URL}/sell`, payload);

      return data.data;
    } catch (err) {
      console.log(err);
    }
  },
  buyCoin: async (payload: TradeType) => {
    try {
      const { data } = await instance.post(`${BASE_URL}/buy`, payload);

      return data.data;
    } catch (err) {
      console.log(err);
    }
  },
};

export default tradeService;
