import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './WeatherQueryComponent.css'
import { useQuery } from 'react-query'
import WeatherComponentDetails from '../WeatherComponentDetails/WeatherComponentDetails'
const WeatherQueryComponent = () => {
    const API_KEY = "10ea41c6a5eb4770a2594541241103"
    const [cityName, setCityName] = useState('')
    const[location,setLocation]=useState('')
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

    const { data, isLoading, isError } = useQuery(['weather-detail', latitude, longitude], fetchMyLocationWeather)

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>error...</div>
    }

    // useEffect(() => {
    //     fetchMyLocationWeather()
    // }, [latitude,longitude])

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
                            // event.preventDefault()
                            getCityWeather();
                        }
                    }}
                />

                {/* <button onClick={getCityWeather}>GetData</button>  */}
            

            {!location&&data&&<WeatherComponentDetails iterator={data}/>}
            {location&&<WeatherComponentDetails iterator={location}/>}
                

            </section>
        </React.Fragment>
    )
}

export default WeatherQueryComponent
