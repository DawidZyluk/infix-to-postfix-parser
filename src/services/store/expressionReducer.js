import { createSlice } from '@reduxjs/toolkit';

export const expressionSlice = createSlice({
  name: 'expression',
  initialState: {
    expression: "",
  },
  reducers: {
    login: (state, action) => {
      state.expression = action.payload;
      state.isLoggedIn = true;
      state.loading = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.expression = null;
      state.loading = false;
    }
  }
});

export const { login, logout } = expressionSlice.actions;

export default expressionSlice.reducer;
