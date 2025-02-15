import React, { useState } from "react";
import "./Weather.css";
import { CiSearch } from "react-icons/ci";
import { TiLocation } from "react-icons/ti";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "835899b62e316132c4889804c72d9c33";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  function handleOnChange(event) {
    setCity(event.target.value);
  }

  async function fetchData() {
    try {
      const response = await fetch(url);
      const output = await response.json();
      if (response.ok) {
        setWeather(output);
        setError("");
      } else {
        setError("No Data Found. Please enter a valid city.");
        setWeather(null);
      }
    } catch (err) {
      setError("An error occurred while fetching the weather data.");
      setWeather(null);
    }
  }

  return (
    <div className="weather-container">
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          placeholder="Enter any city name"
        />
        <button className="search-btn" onClick={fetchData}>
          <CiSearch />
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather && weather.weather && (
        <div className="content">
          <div className="weather-img">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p className="weather-description">
              {weather.weather[0].description}
            </p>
          </div>

          <div className="weather-temp">
            <h3>
              {weather.main.temp} <span>&deg;C</span>
            </h3>
          </div>

          <div className="weather-city">
            <div className="location">
              <TiLocation />
            </div>
            <p>
              {weather.name}, <span>{weather.sys.country}</span>
            </p>
          </div>

          <div className="weather-stats">
            <div className="wind">
              <span className="icon"><FaWind /></span>
              <h3 className="wind-speed">
                {(weather.wind.speed * 3.6).toFixed(1)} <span>Km/h</span>
              </h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>
            <div className="humidity">
              <span className="icon"><WiHumidity /></span>
              <h3 className="humidity-percent">
                {weather.main.humidity} <span>%</span>
              </h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
