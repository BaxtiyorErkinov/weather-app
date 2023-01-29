import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { countriesSlice } from './slices/countries.slice';

export const rootReducer = combineReducers({
  countries: countriesSlice.reducer,
});

export const setupStore = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof setupStore.getState>;
export type AppDispath = typeof setupStore.dispatch;
