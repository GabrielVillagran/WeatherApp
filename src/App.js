// import logo from './logo.svg';
import './App.css';
import Search from './components/search/search';
import Forecast from './components/forecast/forecast'
import CurrentWeather from './components/current-weather/current-weather';
import { currentKey, currentUrl } from './api';
import { useState } from 'react';

function App() {
  // web hooks
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    // API information
    const currentWeatherFetch = fetch(`${currentUrl}/weather?lat=${lat}&lon=${lon}&appid=${currentKey}&units=metric`);
    const forecastFetch = fetch(`${currentUrl}/forecast?lat=${lat}&lon=${lon}&appid=${currentKey}&units=metric`);
    // Using API For retreaving the information
    Promise.all([currentWeatherFetch, forecastFetch])
    .then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForecast({ city: searchData.label, ...forecastResponse });
    })
    .catch((err) => console.log(err));

  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {/* Si existe muestra el label y si no existe no muestra nada */}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
