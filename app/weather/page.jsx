"use client"
import { useEffect, useState } from 'react';



const Search = (props) => {
  return (
    <form className="flex my-4" role="search">
      <input className="form-input mr-2 text-gray-900" type="search" placeholder="City" aria-label="Search" onChange={props.text} />
      <button className="btn bg-slate-900" onClick={props.search}>Search</button>
    </form>
  )
}

const Card = (props) => {


  return (
    <div className="card-wrapper flex flex-col justify-center items-center">
      <Search search={props.search} text={props.text} />
      <div className="card flex flex-col justify-between bg-slate-200" style={{"width": "30%", "height":"100%"}}>
        <div className="tempdiv flex flex-col" style={{ paddingLeft: "20px", paddingTop: "75px", margin: "0px" }}>
          <h1 className='text-gray-900 font-bold'>{props.temp}&deg;C</h1>
          <p className='text-gray-700'>Feels like: {props.feel}&deg;C</p>
          <p className='text-gray-700'>Humidity: {props.humidity}%</p>
          <p className='text-gray-700'>Windspeed: {props.wind}Km/h</p>
        </div>
        <div className="card-body flex flex-col justify-end items-center">
          <h1 className="text-center text-gray-900 font-bold font-satoshi">{props.city.toUpperCase()}</h1>
          
        </div>
      </div>
    </div>
  )
}

const Weather = () => {
  const [state, setstate] = useState({ temprature: '0', feels: '0', humidity: '0', wind: '0', sunset: '', sunrise: '', city: 'karachi' })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({ city: state.city });
        const response = await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?${params}`, {
          headers: {
            'X-RapidAPI-Key': 'f9a1e48373msh92fd8b58e06b224p1ef64djsne0c7219c89a5',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
          }
        });
        const data = await response.json();
        console.log(data);
        setstate(prevstate => ({
          ...prevstate,
          temprature: data.temp,
          feels: data.feels_like,
          humidity: data.humidity,
          wind: data.wind_speed,
          sunset: data.sunset,
          sunrise: data.sunrise
        }));
      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, [])

  const [text, settext] = useState('')

  const textchange = (e) => {
    settext(e.target.value)
  }

  const search = async event => {
    event.preventDefault();
    const city = text;
    try {
      const params = new URLSearchParams({ city: text });
      const response = await fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?${params}`, {
        headers: {
          'X-RapidAPI-Key': 'f9a1e48373msh92fd8b58e06b224p1ef64djsne0c7219c89a5',
          'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
      });
      const data = await response.json();
      setstate(prevstate => ({
        ...prevstate,
        temprature: data.temp,
        feels: data.feels_like,
        humidity: data.humidity,
        wind: data.wind_speed,
        city: city,
        sunset: data.sunset,
        sunrise: data.sunrise
      }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Card temp={state.temprature} feel={state.feels} humidity={state.humidity} wind={state.wind} search={search} text={textchange}  city={state.city} />
    </>
  )
};

export default Weather;
