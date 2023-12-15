import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/auth';
import { AuthType, RegisterType } from '../types/types';

const user = JSON.parse(localStorage.getItem('user')!);

const initialState: AuthType = {
  user: user ?? null,
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (user: RegisterType, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (user: Pick<RegisterType, 'email' | 'password'>, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return await authService.logout();
});

export const balanceUpdate = createAsyncThunk(
  'auth/balance',
  async (_, thunkAPI) => {
    try {
      return await authService.balanceUpdate();
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(balanceUpdate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(balanceUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        if (state.user) {
          state.user.balance = action.payload.data.balance;
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      })
      .addCase(balanceUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
