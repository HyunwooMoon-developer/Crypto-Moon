import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCoin } from '../services/apis';
import tradeService from '../services/trade';
import { TradeReducerType, TradeType } from '../types/types';

const initialState: TradeReducerType = {
  pocket: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const sell = createAsyncThunk(
  'trade/sell',
  async (data: TradeType, thunkAPI) => {
    try {
      return await tradeService.sellCoin(data);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const buy = createAsyncThunk(
  'trade/buy',
  async (data: TradeType, thunkAPI) => {
    try {
      return await tradeService.buyCoin(data);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPocket = createAsyncThunk(
  'trade/pocket',
  async (_, thunkAPI) => {
    try {
      const data: TradeType[] = await tradeService.pocket();

      const coins = await Promise.all(
        data.map(async (item) => {
          const coinData = await getCoin(item.coinID);

          return {
            ...item,
            name: coinData?.name,
            image: coinData?.image,
            symbol: coinData?.symbol,
          };
        })
      );

      return coins;
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const tradeSlice = createSlice({
  name: 'trade',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sell.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sell.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pocket = state.pocket.filter(
          (item) => item.coinID === action.payload.coinID
        );
      })
      .addCase(sell.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(buy.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(buy.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(buy.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getPocket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPocket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.pocket = action.payload;
      })
      .addCase(getPocket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = tradeSlice.actions;

export default tradeSlice.reducer;
