import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './WeatherComponent.css'
import { useQuery } from 'react-query'
import WeatherComponentDetails from '../WeatherComponentDetails/WeatherComponentDetails'

const WeatherComponent = () => {

    const API_KEY = "10ea41c6a5eb4770a2594541241103"
    const [cityName, setcityName] = useState('')
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    const fetchMyLocationWeather = async () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`)
        return response.data
    }

    // const { data: initialData, isLoading: isInitialLoading, isError: isInitialError } = useQuery(['weather-detail', latitude, longitude], fetchMyLocationWeather)

    const {data:initialData,isLoading:isInitialLoading,isError:isInitialError}=useQuery(['weather-detail',longitude,latitude],fetchMyLocationWeather)

    // useEffect(() => {
    //     fetchMyLocationWeather()
    // }, [latitude,longitude])

    const handleCityName = (event) => {
        setcityName(event.target.value)
    }


    const { data: cityData, refetch: refetchgetCityWeather, isLoading: isCityLoading, isError: isCityError } = useQuery(['weather-detail'], async () => {
        if (cityName) {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
            console.log(response.data);
            return response.data;
        }
    }, { keepPreviousData: true });
    //['weather-detail,cityName]-Dynamic change of city Details.

    if (isInitialLoading || isCityLoading) {
        return <div>Loading...</div>
    }

    if (isInitialError || isCityError) {
        return <div>error...</div>
    }
    const getCityWeather = () => {
        refetchgetCityWeather()
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
                            // event.preventDefault()
                            getCityWeather();
                        }
                    }}
                />
                {/* <button onClick={getCityWeather}>GetData</button>  */}
                {!cityData && initialData && <WeatherComponentDetails iterator={initialData} />}
                {cityData && <WeatherComponentDetails iterator={cityData} />}

            </section>
        </React.Fragment>
    )
}
export default WeatherComponent