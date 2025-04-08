import { createSlice } from '@reduxjs/toolkit';
import { scripts,exchanges } from './scriptsData';

const initialState = {
  scripts: [],
  exchanges: [],
};

const scriptsSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setScripts: (state, action) => {
      state.scripts = action.payload.scripts;
      state.exchanges = action.payload.exchanges;
    },
  },
});

export const { setScripts } = scriptsSlice.actions;
export default scriptsSlice.reducer;

