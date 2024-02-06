import { memoize } from 'proxy-memoize';
import { RootState } from 'store';

export const selectSearch = memoize((state: RootState) => state.controls.search);
export const selectRegion = memoize((state: RootState) => state.controls.region);
export const selectControls = memoize((state: RootState) => state.controls);
