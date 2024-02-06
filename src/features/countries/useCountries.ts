import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { memoize } from 'proxy-memoize';

import { RootState, useAppDispatch } from 'store';
import { Country } from 'types';
import { selectControls } from '../controls/controlsSlice';
import { loadCountries } from './countriesSlice';
import { selectCountriesInfo, selectVisibleCountries } from './countriesSelectors';

const useCountries = (): [
  Country[],
  ReturnType<typeof selectCountriesInfo>,
] => {
  const dispatch = useAppDispatch();
  const controls = useSelector(selectControls);
  const countries = useSelector(memoize(
    (state: RootState) => selectVisibleCountries(state, controls),
  ));
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error, qty }];
};

export default useCountries;
