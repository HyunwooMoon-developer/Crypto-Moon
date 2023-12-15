import { Schema, model } from 'mongoose';
import TradeInterface from '../interfaces/TradeInterface';

const TradeSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    coinID: {
      type: String,
      required: [true, 'Coin ID is requred'],
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
  },
  {
    collection: 'Trade',
    versionKey: false,
    timestamps: true,
  }
);

const Trade = model<TradeInterface>('Trade', TradeSchema);

export default Trade;
