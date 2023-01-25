import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';

import './search.css';

type Props = {};

const Search = (props: Props) => {
  const [query, setQuery] = React.useState('');

  console.log(query);

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
    </div>
  );
};

export default Search;
