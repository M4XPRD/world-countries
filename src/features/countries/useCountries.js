import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { memoize } from 'proxy-memoize';

import { selectControls } from '../controls/controlsSlice';
import { loadCountries, selectCountriesInfo, selectVisibleCountries } from './countriesSlice';

const useCountries = () => {
  const dispatch = useDispatch();
  const controls = useSelector(selectControls);
  const countries = useSelector(memoize((state) => selectVisibleCountries(state, controls)));
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error, qty }];
};

export default useCountries;
