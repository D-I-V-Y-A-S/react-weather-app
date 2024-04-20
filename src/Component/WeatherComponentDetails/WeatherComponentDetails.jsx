import React from 'react'

const WeatherComponentDetails = ({iterator}) => {
  return (
    <React.Fragment>
        <div className="details">
               <h3>{iterator.location && iterator.location.name},
                {iterator.location && iterator.location.region}, 
                {iterator.location && iterator.location.country}</h3>
                <img src={iterator.current && `https:${iterator.current.condition.icon}` }  />
                <h3>{iterator.current && iterator.current.condition.text}</h3> 
                
                <div className="container">
                <div className="align-box">
                <h1> <i>Fahrenheit</i><br/>{iterator.current && iterator.current.temp_f}<sup>o</sup>F</h1>
                </div>
                <div className="align-box">
                <h1><i>Feels Like </i><br/>{iterator.current && iterator.current.temp_c}<sup>o</sup>C</h1>
                </div>
                <div className="align-box">
                <h1><i>Humidity</i><br/>{iterator.current && iterator.current.humidity}</h1>
                </div>
                </div>

</div>
               
    </React.Fragment>
  )
}

export default WeatherComponentDetails