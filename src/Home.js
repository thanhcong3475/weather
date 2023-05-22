import React, { useEffect, useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import {images} from './constants'
import axios from 'axios'
import './style.css'

const Home = () => {
    const [Data, setData] = useState({
        celcius: 10,
        name: 'VietName',
        humidity: 10,
        speed: 2,
        state: ''
    })

    const [Name, setName] = useState('VietNam')
    const [Sun, setSun] = useState(false)
    const [Rain, setRain] = useState(false)
    const [Drizzle, setDrizzle] = useState(false)
    const [Cloudy, setCloudy] = useState(false)
    const [Mist, setMist] = useState(false)

    useEffect(() => {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${Name}&appid=01ed8898d5edbf899c7b06e7015f1225&units=metric`   
        axios.get(apiURL)
        .then(res=> 
           { 
            if (res.data.weather[0].main === 'Clouds') {
                setCloudy(true)
            } else if (res.data.weather[0].main === 'Clear') {
                setSun(true)
            } else if (res.data.weather[0].main === 'Rain') {
                setRain(true)
            } else if (res.data.weather[0].main === 'Drizzle') {
                setDrizzle(true)
            } else if (res.data.weather[0].main === 'Mist') {
                setMist(true)
            }
            setData({...Data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, state: res.data.weather[0].description})
        }
        )
        .catch(err => console.error(err))
    }, [])

    const handleClick = () => {
        if (Name !== '') {
             const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${Name}&appid=01ed8898d5edbf899c7b06e7015f1225&units=metric`   
        axios.get(apiURL)
        .then(res=> 
           { 
            if (res.data.weather[0].main === 'Clouds') {
                setCloudy(true)
                setSun(false)
                setRain(false)
                setDrizzle(false)
                setMist(false)
            } else if (res.data.weather[0].main === 'Clear') {
                setCloudy(false)
                setSun(true)
                setRain(false)
                setDrizzle(false)
                setMist(false)
            } else if (res.data.weather[0].main === 'Rain') {
                setCloudy(false)
                setSun(false)
                setRain(true)
                setDrizzle(false)
                setMist(false)
            } else if (res.data.weather[0].main === 'Drizzle') {
                setCloudy(false)
                setSun(false)
                setRain(false)
                setDrizzle(true)
                setMist(false)
            } else if (res.data.weather[0].main === 'Mist') {
                setCloudy(false)
                setSun(false)
                setRain(false)
                setDrizzle(false)
                setMist(true)
            }
            setData({...Data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, state: res.data.weather[0].description})
            console.log(res.data)
        }
        )
        .catch(err => console.error(err))
        }
    }

  return (
    <div className='container'>
        <div className='wrapper'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter city name' onChange={e => setName(e.target.value)}/>
                    <button onClick={handleClick}><BsSearch /></button>
                </div>
                <div className='winfo'>
                    <div> 
                        {
                            Cloudy && (<img src = {images.cloudy} />) }
                        {   Sun && (<img src = {images.sun} />) }
                         {   Rain && (<img src = {images.rain} />)}
                         {   Drizzle && (<img src = {images.drizzle} />)}
                           { Mist && (<img src = {images.mist} />)
                        }
                        
                    </div>
                    <h3 className='state'>
                                {Data.state}     
                    </h3>
                    <div>
                    <h1>{Math.round(Data.celcius)}</h1>
                    <h2>{Data.name}</h2>    
                     </div>
                    <div className='details'>
                        <div className='col'>
                            <img src={images.humidity}/>
                            <div>
                                <p>{Math.round(Data.humidity)} %</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={images.speed}/>
                            <div style={{marginLeft:'10px'}}>
                                <p>{Math.round(Data.speed)} km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home
