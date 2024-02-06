import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from 'store';
import { loadNeighboursByBorder } from './detailsSlice';
import { selectNeighbours } from './detailsSelectors';

const useNeighbours = (borders: string[] = []) => {
  const dispatch = useAppDispatch();
  const neighbours = useSelector(selectNeighbours);

  useEffect(() => {
    if (borders.length) {
      dispatch(loadNeighboursByBorder(borders));
    }
  }, [borders, dispatch]);

  return neighbours;
};

export default useNeighbours;
