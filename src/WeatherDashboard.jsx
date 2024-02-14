import { useState, useEffect } from "react";

function WeatherDashboard(){
  const [cityName, setCityName] = useState('City name');
  const [temperature, setTemperature] = useState(`30`);
  const [windSpeed, setWindSpeed] = useState('40');
  const [humidity, setHumidity] = useState(84);
  const [time, setTime] = useState(`02:30`);
  const [weather, setWeather] = useState(`Cloudy`);
  const [visibility, setVisibility] = useState('10');
  
  function handleWeather(){
    setCityName(document.getElementById('city').value);

  }
  return(
    <div className="dashboard">
      <div className="nameDiv">
        <p className="city-name">{cityName}</p>
        <p className="time">{time}</p>
      </div>
      <div className="tempDiv">
        <p className="temperature">{temperature}&#176;C</p>
        <p className="weather">{weather}</p>
      </div>
      <div className="extrasDiv">
        <span>
          <p className="wind-speed">Wind speed: {windSpeed} km/h</p>
          <p className="humidity">Humidity: {humidity}&#37;</p>
          <p className="visibility">Visibility: {visibility} km</p>
        </span>
        <span>
          <img className="weather-image" src="https://placehold.jp/150x150.png" alt="" />
        </span>
        
      </div>
      <div className="input-container">
          <input placeholder={cityName} className="text-box" type="text" name="" id="city" />
          <button className="search-button" onClick={handleWeather}>search</button>
      </div>
    </div>
  );
}
export default WeatherDashboard;