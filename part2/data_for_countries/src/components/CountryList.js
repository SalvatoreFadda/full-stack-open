import React, { useState } from 'react';
import Country from './Country';

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  if (countries.length > 10) {
    return <p>Too many matches, please specify your search.</p>;
  } else if (countries.length === 1) {
    return <Country country={countries[0]} showDetails={true} />;
  } else if (countries.length > 0) {
    if (selectedCountry) {
      return (
        <>
          <ul>
            {countries.map((country) => (
              <li key={country.cca3}>
                {country.name.common}{' '}
                <button onClick={() => handleShowCountry(country)}>
                  Show
                </button>
              </li>
            ))}
          </ul>
          <Country country={selectedCountry} showDetails={true} />
        </>
      );
    } else {
      return (
        <ul>
          {countries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => handleShowCountry(country)}>
                Show
              </button>
            </li>
          ))}
        </ul>
      );
    }
  }

  return <p>No results found.</p>;
};

export default CountryList;