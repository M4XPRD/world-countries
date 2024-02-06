import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { ChangeEventHandler } from 'react';
import { setSearch } from './controlsSlice';
import { selectSearch } from './controlsSelectors';

type OnSearch = ChangeEventHandler<HTMLInputElement>;

const useSearch = (): [string, OnSearch] => {
  const dispatch = useAppDispatch();
  const search = useSelector(selectSearch);

  const handleSearch: OnSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return [search, handleSearch];
};

export default useSearch;
