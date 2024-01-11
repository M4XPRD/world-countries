import styled from 'styled-components';
import Select from 'react-select';

const CustomSelect = styled(Select).attrs({
  styles: {
    control: (provided) => ({
      ...provided,
    }),
    option: () => ({}),
  },
})``;

export default CustomSelect;
