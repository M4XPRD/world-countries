import { useAppDispatch } from 'store';
import { clearControls } from './controlsSlice';

const useCleanup = () => {
  const dispatch = useAppDispatch();

  const cleanUp = () => dispatch(clearControls());

  return () => dispatch(cleanUp());
};

export default useCleanup;
