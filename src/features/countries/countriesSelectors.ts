import { memoize } from 'proxy-memoize';
import { RootState } from 'store';

export const selectCountriesInfo = memoize((state: RootState) => ({
  status: state.countries.status,
  error: state.countries.error,
  qty: state.countries.list.length,
}));

export const selectAllCountries = memoize((state: RootState) => state.countries.list);
export const selectVisibleCountries = (state: RootState, { search = '', region = '' }) => state.countries.list.filter(
  (country) => (
    country.name.toLowerCase().includes(search.toLowerCase()) && country.region.includes(region)
  ),
);
