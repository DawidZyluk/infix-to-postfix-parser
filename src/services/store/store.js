import { configureStore } from '@reduxjs/toolkit'
import expressionReducer from './expressionReducer'

export const store = configureStore({
  reducer: {expressionReducer},
})