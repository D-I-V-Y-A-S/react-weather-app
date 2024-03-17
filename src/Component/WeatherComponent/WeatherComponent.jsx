import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './WeatherComponent.css'
import {useQuery} from 'react-query'
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

    const {data:startData,status:startStatus,isLoading:isStartLoading,isError:isStartError}=useQuery(['weather-detail'],fetchMyLocationWeather)

    // useEffect(() => {
    //     fetchMyLocationWeather()
    // }, [latitude,longitude])

    const handleCityName = (event) => {
        setcityName(event.target.value)
    }

   
    const {data: loadData, status: LoadStatus, refetch: refetchgetCityWeather, isLoading: isLoadLoading, isError: isLoadError} = useQuery(['weather-detail'], async () => {
        if(cityName) {
            const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`);
            console.log(response.data);
            return response.data;
        }
    },{keepPreviousData: true});
    

         if (isStartLoading||isLoadLoading) {
            return <div>loading...</div>
        }
    
        if (isStartError||isLoadError) {
            return <div>error...</div>
        }
     const getCityWeather =  () => {
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
                            getCityWeather();
                        }
                    }}                 
                />
               {!loadData &&startData && <WeatherComponentDetails iterator={startData} />}

               {loadData && <WeatherComponentDetails iterator={loadData} />}
                 {/* /* <button onClick={getCityWeather}>GetData</button> */} 
                </section>
                </React.Fragment>
    )
}
export default WeatherComponent