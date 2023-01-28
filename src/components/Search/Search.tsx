import axios, { AxiosError, CanceledError } from 'axios';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { useQuery } from 'react-query';
import { search__coutry } from '../../api/constants';
import { useDebounce } from '../../hooks/useDebounce';
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

  const { data, isError, error } = useQuery({
    queryKey: ['countries', debouncedQuery],
    queryFn: () => fetchCountries(debouncedQuery),
  });

  return (
    <div className="searchbar">
      <div className="searchbar__container">
        <AiOutlineSearch className="search__icon" />
        <input
          type="text"
          placeholder="Search..."
          className="searchbar__input"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        {query.length > 5 ? (
          <MdClose className="delete__icon" onClick={() => setQuery('')} />
        ) : null}
      </div>
      {Array.isArray(data) && data.length ? <Suggestion data={data} /> : null}
    </div>
  );
};

export default Search;
