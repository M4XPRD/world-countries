import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { themeReducer } from 'features/theme/themeSlice';
import { controlsReducer } from 'features/controls/controlsSlice';
import { countryReducer } from 'features/countries/countriesSlice';
import { detailsReducer } from 'features/details/detailsSlice';
import * as api from 'config';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    controls: controlsReducer,
    countries: countryReducer,
    details: detailsReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        client: axios,
        api,
      },
    },
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
