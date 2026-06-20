import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  statusCode: null,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload.message || 'An error occurred';
      state.statusCode = action.payload.statusCode || 500;
    },
    clearError: (state) => {
      state.error = null;
      state.statusCode = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
