import { useDispatch } from 'react-redux';
import { clearControls } from './controlsSlice';

const useCleanup = () => {
  const dispatch = useDispatch();

  const cleanUp = () => dispatch(clearControls());

  return () => dispatch(cleanUp());
};

export default useCleanup;
