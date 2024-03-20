import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Sunny from '../res/Background Sunny.png';
import ClearNight from '../res/Background Clear Night.png'
import OvercastNight from '../res/Background Night Overcast.png'
import RainyNight from '../res/Background Night Raining.png'
import Overcast from '../res/Background Overcast.png'
import Rainy from '../res/Background Raining.png'
import SnowyNight from '../res/Background Snowing Night.png'
import Snowy from '../res/Background Snowing.png'

export default function GetWeatherBackground(props) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(`http://localhost:8000/garden/weather/${latitude}/${longitude}/`);
        setWeatherData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchWeather(latitude, longitude);
        }, (error) => {
          setError(error.message);
        });
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  if (error) {
    // Return default weather icon and location
    return (
    <div className = "garden--imgdiv" >
    <img className = "garden--img" src={Sunny} />
    </div>
  )}

  if (!weatherData) {
    // Render loading state
    return <p id="loading-text">Loading...</p>;
  }

  const weatherIconCode = weatherData.weather[0].icon;
  let weather = null;
  switch (weatherIconCode){
    case "01d":
    case "02d":
        weather = Sunny
        break;
    case "01n":
    case "02n":
        weather = ClearNight
        break;
    case "03d":
    case "04d":
    case "50d":
        weather = Overcast
        break;
    case "03n":
    case "04n":
    case "50n":
        weather = OvercastNight
        break;
    case "09d":
    case "10d":
    case "11d":
        weather = Rainy
        break;
    case "10n":
    case "09n":
    case "11n":
        weather = RainyNight
        break;
    case "13n":
        weather = SnowyNight
        break;
    case "13d":
        weather = Snowy
        break;
  }
  const weatherLocationName = weatherData.name;
  const weatherLocationCountry = weatherData.sys.country;

  return (
    <div className="garden--imgdiv">
      <img className="garden--img" src={weather} alt="Weather Icon" />
      <div className="garden--locdiv">
            <h2 className="garden--loc">⚲ {weatherLocationName}, {weatherLocationCountry}</h2>
      </div>
    </div>
  );
};
