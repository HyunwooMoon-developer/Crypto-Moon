import axios from 'axios';
import { CoinType } from '../types/types';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const getCoins = async () => {
  const { data } = await axios.get(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false`
  );

  try {
    const coins: CoinType[] = [];

    for (const coin of data) {
      coins.push({
        id: coin.id,
        name: coin.name,
        rank: coin.market_cap_rank,
        image: coin.image,
        symbol: coin.symbol,
        price: coin.current_price,
        volume: coin.total_volume,
        perDay: coin.price_change_24h,
        market_cap: coin.market_cap,
      });
    }

    return coins;
  } catch (err) {
    console.log(err);
  }
};

export const getCoin = async (id: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  try {
    const coin: CoinType = {
      id: data.id,
      name: data.name,
      rank: data.market_cap_rank,
      symbol: data.symbol,
      image: data.image.small,
      price: data.market_data.current_price.usd,
    };

    return coin;
  } catch (err) {
    console.log(err);
  }
};

export const getCoinChart = async (id: string, days: string) => {
  const { data } = await axios.get(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
  );

  try {
    return data.prices;
  } catch (err) {
    console.log(err);
  }
};

export const searchCoin = async (search: string) => {
  const { data } = await axios.get(`${BASE_URL}/search?query=${search}`);

  try {
    return data.coins;
  } catch (err) {
    console.log(err);
  }
};
