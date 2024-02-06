import styled from 'styled-components';
import Select, { CSSObjectWithLabel, Props } from 'react-select';
import { Region } from 'types';

export type CountryOption = {
  label: Region,
  value: Region,
} | '';

const MySelect = (props: Props<CountryOption, false>) => (
  <Select {...props} />
);

const CustomSelect = styled(MySelect).attrs({
  styles: {
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      backgroundColor: 'var(--colors-ui-base)',
      color: 'var(--colors-text)',
      borderRadius: 'var(--radius)',
      padding: '0.25rem',
      border: 'none',
      boxShadow: 'var(--shadow)',
      height: '50px',
      cursor: 'pointer',
    }),
    option: (provided: CSSObjectWithLabel, state: { isSelected: boolean }) => ({
      ...provided,
      cursor: 'pointer',
      color: 'var(--colors-text)',
      backgroundColor: state.isSelected
        ? 'var(--colors-bg)' : 'var(--colors-ui-base)',
    }),
    menuList: (provided: CSSObjectWithLabel) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
      borderRadius: '0.3rem',
      backgroundColor: 'var(--colors-ui-base)',
    }),
  },
})`
  width: 200px;
  border-radius: var(--radius);
  font-family: var(--family);
  border: none;

  & > * {
    box-shadow: var(--shadow);
  }

  & input {
    padding-left: 0.25rem;
  }

  & * {
    color: var(--colors-text) !important;
  }

  & > div[class*="menu"] {
    background-color: var(--colors-ui-base);
  }
`;

export default CustomSelect;
