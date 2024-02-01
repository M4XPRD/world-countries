/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { memoize } from 'proxy-memoize';

export const loadCountryByName = createAsyncThunk(
  'details/load-country-by-name',
  (name, { extra: { client, api } }) => client.get(api.searchByCountry(name)),
);
export const loadNeighboursByBorder = createAsyncThunk(
  'details/load-neighbours',
  (borders, { extra: { client, api } }) => client.get(api.filterByCode(borders)),
);

const initialState = {
  currentCountry: null,
  neighbours: [],
  status: 'idle',
  error: null,
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        const [currentCountry] = action.payload.data;
        state.status = 'idle';
        state.currentCountry = currentCountry;
      })
      .addCase(loadNeighboursByBorder.fulfilled, (state, action) => {
        state.neighbours = action.payload.data.map((country) => country.name);
      });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;

export const selectCurrentCountry = memoize((state) => state.details.currentCountry);
export const selectDetails = memoize((state) => state.details);
export const selectNeighbours = memoize((state) => state.details.neighbours);
