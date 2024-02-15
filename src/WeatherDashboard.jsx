import { useState, useEffect } from "react";

function WeatherDashboard(){
  const [cityName, setCityName] = useState('');
  const [temperature, setTemperature] = useState(`0`);
  const [windSpeed, setWindSpeed] = useState('00');
  const [humidity, setHumidity] = useState(0);
  const [country, setCountry] = useState(``);
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('0');
  const [cityLat, setCityLat] = useState();
  const [cityLong, setCityLong] = useState();
  const [weatherIcon, setWeatherIcon] = useState('');
  const [hasChanged, sethasChanged] = useState(false);
  useEffect(() => {
    if(hasChanged == true){
      const convertCityCord = async() => {
        try{
          const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=27a74a541fe845c698c8be6a8d9396c6`);
          if(!response.ok){
            throw new Error("could not fetch data")
          }
          const cityData = await response.json();
          setCityLat(cityData[0].lat);
          setCityLong(cityData[0].lon);
          setCountry(cityData[0].country)
        }
        catch(error){
          console.error(error)
        }
      }
      convertCityCord();
    }
    
    
  },[cityName])

  useEffect(() => {
    if(hasChanged == true){
      const getWeather = async() => {
        try{
          const weatherDetails = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLong}&units=metric&appid=27a74a541fe845c698c8be6a8d9396c6`);
          if(!weatherDetails.ok){
            throw new Error("could not fetch data")
          }
          const weatherData = await weatherDetails.json();
          setWindSpeed(weatherData.wind.speed);
          setHumidity(weatherData.main.humidity);
          setVisibility((weatherData.visibility)/ 1000)
          setTemperature(weatherData.main.temp)
          setWeatherIcon(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`)
          setWeather(weatherData.weather[0].main)
        }
        catch(error){
          console.error(error);
        }
      }
      getWeather()
    }
  }, [cityLong])
  const handleClick = () => {
    sethasChanged(true);
    setCityName(document.getElementById('city').value.toUpperCase())
  }

  return(
    <div className="dashboard">
      <div className="nameDiv">
        <p className="city-name">CITY: {cityName}</p>
        <p className="time">COUNTRY: {country}</p>
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
          <img className="weather-image" src={weatherIcon} alt="" />
        </span>
        
      </div>
      <div className="input-container">
          <input placeholder={cityName} className="text-box" type="text" name="" id="city" />
          <button className="search-button" onClick={handleClick}>search</button>
      </div>
    </div>
  );
}
export default WeatherDashboard;