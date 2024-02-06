import { useSelector } from 'react-redux';
import { useAppDispatch } from 'store';
import { Region } from 'types';
import { SingleValue } from 'react-select';
import { setRegion } from './controlsSlice';
import { selectRegion } from './controlsSelectors';
import { CountryOption } from './CustomSelect';

type OnSelect = (reg: SingleValue<CountryOption>) => void;

const useRegion = (): [Region | '', OnSelect] => {
  const dispatch = useAppDispatch();
  const region = useSelector(selectRegion);

  const handleSelect: OnSelect = (reg) => {
    if (reg) {
      dispatch(setRegion(reg.value || ''));
    } else {
      dispatch(setRegion(''));
    }
  };

  return [region, handleSelect];
};

export default useRegion;
