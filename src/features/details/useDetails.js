import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { clearDetails, loadCountryByName, selectDetails } from './detailsSlice';

const useDetails = (name) => {
  const dispatch = useDispatch();
  const details = useSelector(selectDetails);

  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => {
      dispatch(clearDetails());
    };
  }, [name, dispatch]);

  return details;
};

export default useDetails;
