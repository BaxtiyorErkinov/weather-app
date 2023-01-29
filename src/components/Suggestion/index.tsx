import axios from 'axios';
import React, { FC } from 'react';
import { ICountry } from '../../models/ICountries';

import './suggestion.css';

interface IProps {
  data: ICountry[];
  clear: () => void;
  activeIndex: number;
  onSelect: (data: ICountry) => void;
}

const Suggestion: FC<IProps> = ({ data, activeIndex, clear, onSelect }) => {
  const activeSuggestionRef = React.useRef<HTMLLIElement>(null);
  const suggestionsContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(
    function () {
      const handleCloseSuggestions = (event: any) => {
        event.preventDefault();
        clear();
      };

      window.addEventListener('click', handleCloseSuggestions);

      return () => {
        window.removeEventListener('click', handleCloseSuggestions);
      };
    },
    [clear],
  );

  React.useEffect(
    function () {
      if (data.length > 0) {
        const { y: childY, height: childHeight } =
          activeSuggestionRef.current.getBoundingClientRect();
        const { y: containerY, height: containerHeight } =
          suggestionsContainerRef.current.getBoundingClientRect();

        if (childY - containerY < 0) {
          activeSuggestionRef.current.scrollIntoView();
        }
        if (childY - containerY > containerHeight - childHeight) {
          activeSuggestionRef.current.scrollIntoView(false);
        }
      }
    },
    [activeIndex, data.length],
  );

  return (
    <div className="suggestion__container" ref={suggestionsContainerRef}>
      <ul className="suggestion__list">
        {data.map((suggestion, index) =>
          activeIndex === index ? (
            <li
              ref={activeSuggestionRef}
              className="suggestion__list-item bg-purple-800"
              key={suggestion.id}>
              <img
                src={`https://flagsapi.com/${suggestion.country_code}/flat/32.png`}
                alt=""
              />
              {suggestion.name} - ({suggestion.latitude}, {suggestion.longitude}
              )
            </li>
          ) : (
            <li
              className="suggestion__list-item"
              key={suggestion.id}
              onClick={(e: React.MouseEvent<HTMLLIElement>) => {
                e.stopPropagation();
                onSelect(suggestion);
                clear();
              }}>
              <img
                src={`https://flagsapi.com/${suggestion.country_code}/flat/32.png`}
                alt=""
              />
              {suggestion.name} - ({suggestion.latitude}, {suggestion.longitude}
              )
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Suggestion;
