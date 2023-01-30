import axios, { AxiosError, CanceledError } from 'axios';
import React, { KeyboardEvent } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { useQuery } from 'react-query';
import { search__coutry } from '../../api/constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useDebounce } from '../../hooks/useDebounce';
import { ICountry } from '../../models/ICountries';
import {
  clearCountries,
  setCountries,
  setSelectedCountry,
} from '../../store/slices/countries.slice';
import Suggestion from '../Suggestion';

import './search.css';

type Props = {};

const fetchCountries = async (query: string) => {
  try {
    const res = await axios.get(search__coutry, {
      params: {
        name: query,
      },
    });
    return await res.data.results;
  } catch (error) {
    const err = error as AxiosError;
    console.log(err.response?.data);
  }
};

const Search = (props: Props) => {
  const [query, setQuery] = React.useState('');
  const debouncedQuery = useDebounce<string>(query, 500);

  const dispatch = useAppDispatch();
  const { countries } = useAppSelector((state) => state.countries);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = React.useState(0);

  const { data, isError, error } = useQuery({
    queryKey: ['countries', debouncedQuery],
    queryFn: () => fetchCountries(debouncedQuery),
    onSuccess(data) {
      dispatch(setCountries(data));
    },
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex((state) => Math.max(0, state - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex((state) =>
        Math.min(countries.length - 1, state + 1),
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (countries.length > 0) {
        dispatch(setSelectedCountry(countries[activeSuggestionIndex]));
        dispatch(clearCountries());
      }
    }
  };

  const handleClearSuggestions = () => {
    dispatch(clearCountries());
  };

  return (
    <div className="searchbar">
      <div className="searchbar__container group">
        <AiOutlineSearch className="search__icon" />
        <input
          type="text"
          placeholder="Search..."
          className="searchbar__input"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          onKeyDown={handleKeyDown}
        />
        {query.length > 5 ? (
          <MdClose className="delete__icon" onClick={() => setQuery('')} />
        ) : null}
      </div>
      {Array.isArray(countries) && countries.length ? (
        <Suggestion
          data={countries}
          activeIndex={activeSuggestionIndex}
          clear={handleClearSuggestions}
          onSelect={(data: ICountry) => dispatch(setSelectedCountry(data))}
        />
      ) : null}
    </div>
  );
};

export default Search;
