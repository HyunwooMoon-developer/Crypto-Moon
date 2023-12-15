export type RegisterType = {
  email: string;
  password: string;
  fname: string;
  lname: string;
};

export type UserType = {
  _id: string;
  email: string;
  fname: string;
  lname: string;
  balance: number;
};

export type AuthType = {
  user: UserType | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};

export type TradeType = {
  userID?: string;
  coinID: string;
  amount: number;
  price: number;
  image?: string;
  name?: string;
  symbol?: string;
};

export type TradeReducerType = {
  pocket: TradeType[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
};

export type CoinType = {
  id: string;
  image: string;
  market_cap?: number;
  name: string;
  perDay?: number;
  price: number;
  rank: number;
  symbol: string;
  volume?: number;
};
