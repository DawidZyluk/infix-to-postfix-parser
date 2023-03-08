import { createSlice } from '@reduxjs/toolkit';

export const expressionSlice = createSlice({
  name: 'expression',
  initialState: {
    expression: "",
  },
  reducers: {
    storeExpression: (state, action) => {
      state.expression = action.payload;
    },
    clearExpression: (state) => {
      state.expression = "";
    }
  }
});

export const { storeExpression, clearExpression } = expressionSlice.actions;

export default expressionSlice.reducer;
