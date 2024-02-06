import { memoize } from 'proxy-memoize';
import { RootState } from 'store';

export const selectCurrentCountry = memoize((state: RootState) => state.details.currentCountry);
export const selectDetails = memoize((state: RootState) => state.details);
export const selectNeighbours = memoize((state: RootState) => state.details.neighbours);
