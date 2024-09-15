import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface AppSlice {
  isLoading: boolean;
}

const initialState: AppSlice = {
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const selectIsLoading = (state: RootState) => state.app.isLoading;

export default appSlice.reducer;
