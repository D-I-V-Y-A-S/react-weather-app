import axios from 'axios'
import React, { useState } from 'react'
import './WeatherComponent.css'
const WeatherComponent = () => {

    const API_KEY = `10ea41c6a5eb4770a2594541241103`
    const [cityName, setcityName] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const [temperature, setTemp] = useState(0)
    const handleCityName = (event) => {
        setcityName(event.target.value)
    }

    const getCityWeather = async () => {
        try {

            if (cityName.trim() === '') {
                console.log('City name is empty');
                return;
            }
            else {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
                console.log(response.data);
                setWeatherData(response.data);
                setTemp(response.data.current.temp_c);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <section className='main-container'>
            <p className="temperature">
                {`${temperature}°C`}
            </p>
            <div className='search-bar-container'>
                <input
                    type='text'
                    id='cityNameText'
                    placeholder='Enter your city name here'
                    value={cityName}
                    onChange={handleCityName}
                    onKeyDown={getCityWeather}
                />

                <button onClick={getCityWeather}>GetData</button>

            </div>
            <p className="weather-details">

                <img src={weatherData.current && `https:${weatherData.current.condition.icon}`} />
                {weatherData.current && weatherData.current.condition.text}

                {weatherData.location && weatherData.location.name}
                {weatherData.location && weatherData.location.region}
                {weatherData.location && weatherData.location.country}

            </p>
        </section>
    )

}
export default WeatherComponent