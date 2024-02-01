/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { memoize } from 'proxy-memoize';

const initialState = {
  search: '',
  region: '',
};

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    clearControls: () => initialState,
  },
});

export const { setRegion, setSearch, clearControls } = controlsSlice.actions;
export const controlsReducer = controlsSlice.reducer;

export const selectSearch = memoize((state) => state.controls.search);
export const selectRegion = memoize((state) => state.controls.region);
export const selectControls = memoize((state) => state.controls);
