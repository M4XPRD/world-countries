import { RootState } from 'store';

const selectTheme = (state: RootState) => state.theme;

export default selectTheme;
