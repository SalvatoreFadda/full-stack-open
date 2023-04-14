import React, { useEffect, useState } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;
console.log('API Key:', process.env.REACT_APP_API_KEY);

const Country = ({ country, showDetails }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (showDetails) {
      getWeatherData();
    }
  }, [country, showDetails]);

  if (!showDetails) {
    return <>{country.name.common}</>;
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common} flag`} style={{ width: '100px', height: 'auto' }} />

      {weather && (
        <>
          <h3>Weather in {country.capital}</h3>
          <p>
            <strong>Temperature:</strong> {weather.main.temp} °C
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
            style={{ width: '50px', height: 'auto' }}
          />
          <p>
            <strong>Wind:</strong> {weather.wind.speed} m/s
          </p>
        </>
      )}
    </div>
  );
};

export default Country