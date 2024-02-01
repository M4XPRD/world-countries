/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { memoize } from 'proxy-memoize';

export const loadCountries = createAsyncThunk(
  'countries/load-countries',
  (_, {
    extra: { client, api },
  }) => client.get(api.ALL_COUNTRIES),
  {
    condition: (_, { getState }) => {
      const { countries: { status } } = getState();

      if (status === 'loading') {
        return false;
      }
    },
  },
);

const initialState = {
  status: 'idle',
  error: null,
  list: [],
};

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload || action.meta.error;
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = 'received';
        state.list = action.payload.data;
      });
  },
});

export const countryReducer = countrySlice.reducer;

export const selectCountriesInfo = memoize((state) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
}));

export const selectAllCountries = memoize((state) => state.countries.list);
export const selectVisibleCountries = (state, { search = '', region = '' }) => state.countries.list.filter(
  (country) => (
    country.name.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region)
  ),
);
