import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tradeReducer from './tradeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    trade: tradeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
