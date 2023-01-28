import axios from 'axios';
import React, { FC } from 'react';
import { ICountry } from '../../models/ICountries';

import './suggestion.css';

interface IProps {
  data: ICountry[];
}

const Suggestion: FC<IProps> = ({ data }) => {
  return (
    <div className="suggestion__container">
      <ul className="suggestion__list">
        {data.map(({ name, latitude, longitude, country_code, id }) => {
          return (
            <li className="suggestion__list-item" key={id}>
              <img
                src={`https://flagsapi.com/${country_code}/flat/32.png`}
                alt=""
              />
              {name} - ({latitude}, {longitude})
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Suggestion;
