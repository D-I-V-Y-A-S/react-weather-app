import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './WeatherQueryComponent.css'
import { useQuery } from 'react-query'
import WeatherComponentDetails from '../WeatherComponentDetails/WeatherComponentDetails'

const WeatherQueryComponent = () => {
    const API_KEY = "10ea41c6a5eb4770a2594541241103"

    const [cityName, setCityName] = useState('')
    const [location, setLocation] = useState('')

    //current location
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const fetchMyLocationWeather = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);

            if (latitude && longitude) {
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`);
                return (response.data);
            }
            else {
                throw new Error("Failed to retrieve latitude and longitude");
            }
        }
        catch (error) {
            console.error("Error fetching weather:", error);
        }
    };

    const { data, isLoading, isError } = useQuery(['weather-detail', latitude, longitude], fetchMyLocationWeather)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>error...</div>
    }

    const handleCityName = (event) => {
        setCityName(event.target.value)
    }
    const getCityWeather = async () => {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
        console.log(response.data);
        setLocation(response.data)
    }
    return (
        <React.Fragment>
            <h1 className="title">Weather Forecast</h1>
            <section className="main-container">
                <input
                    className="input-box"
                    type='text'
                    id='cityNameText'
                    placeholder='Enter Your Location'
                    value={cityName}
                    onChange={handleCityName}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                            getCityWeather();
                        }
                    }}
                />
         
                {!location && data && <WeatherComponentDetails iterator={data} />}
                {location && <WeatherComponentDetails iterator={location} />}

            </section>
        </React.Fragment>
    )
}

export default WeatherQueryComponent
