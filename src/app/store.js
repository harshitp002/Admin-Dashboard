import { configureStore } from '@reduxjs/toolkit';
import scriptsReducer from '../features/scripts/scriptsSlice';

export const store = configureStore({
  reducer: {
    data: scriptsReducer,
  },
});
