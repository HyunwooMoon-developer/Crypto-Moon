import { Schema } from 'mongoose';

interface TradeInterface {
  userID: Schema.Types.ObjectId;
  coinID: string;
  amount: number;
  price: number;
}

export default TradeInterface;
