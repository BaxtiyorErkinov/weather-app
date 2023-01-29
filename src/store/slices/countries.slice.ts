import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountry } from '../../models/ICountries';

interface IState {
  countries: ICountry[];
  selectedCountry: ICountry;
}

const initialState: IState = {
  countries: [],
  selectedCountry: {} as ICountry,
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    clearCountries: (state) => {
      state.countries = [];
    },
    setCountries: (state, { payload }: PayloadAction<ICountry[]>) => {
      state.countries = payload;
    },
    setSelectedCountry: (state, { payload }: PayloadAction<ICountry>) => {
      state.selectedCountry = payload;
    },
  },
});

export const { clearCountries, setCountries, setSelectedCountry } =
  countriesSlice.actions;
