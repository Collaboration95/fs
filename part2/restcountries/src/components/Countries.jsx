import React, { useState, useEffect } from 'react'

import axios from 'axios'

const Weather = ({city,latlng}) => {
    const [weather, setWeather] = useState({})
    const api_key = import.meta.env.VITE_API_KEY;
    const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`
    useEffect(() => {    
        axios
            .get(weatherUrl)
            .then(response => {
                setWeather(response.data);
            })
    }, [latlng]);
    
    if (Object.keys(weather).length==0) {
        return (
          <>
            <div>
              Loading weather data...
            </div>
          </>
        );
      }
    else{
        const link = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    return (
        <>
            <h3>Weather in {city}</h3>
            <div><b>temperature:</b> {weather.main.temp} Celsius</div>
            <img src={link} alt="flag" width="50" height="100%"></img>
            <div><b>wind:</b> {weather.wind.speed} mph</div>
        </>
    )
    }
}

const Countries = ({ countries,handleShow }) => {

    if(countries.length>10){
        return (
            <>
                <div>
                    Too many matches, specify another filter
                </div>
            </>
        )
    }
    else if(countries.length>1){
        return (
            <>

                    {countries.map(country =><><div key={country.flags.official}>{country.name.common}</div><button key={country.name.common} value={country.name.common} onClick={handleShow}>show</button></>)}

            </>
        )
    }
    else if(countries.length==1){
        return (
            <>
                    <h1>{countries[0].name.common}</h1>
                    <table><tbody>
                        <tr>
                            <td>Capital</td>
                            <td>{countries[0].capital[0]}</td>
                        </tr>
                        <tr>
                            <td>Area</td>
                            <td>{countries[0].area}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h3>languages:</h3>
                    <ul>
                        {Object.values(countries[0].languages).map(language => <li key={language}>{language}</li>)}
                    </ul>
                    <img src={countries[0].flags.png} alt="flag" width="500" height="100%"></img>
                    <Weather city={countries[0].name.common} latlng={countries[0].latlng}/>
            </>
        )
    }
    else{
        return (
            <>
                <div>
                    No matches found
                </div>
            </>
        )
    }
}

export default Countries;