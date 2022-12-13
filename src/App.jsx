import React, { useState } from 'react';
import classes from './App.module.css';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState('');
  const [data, setData] = useState({});
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4c83d97523c98d7a23672d46f7f53d16`

  const locationHandler = (e) => {
    setLocation(e.target.value);
  }

  const searchHandler = (event) => {
    event.preventDefault();
    axios.get(url)
      .then(res => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(err => {
        alert('Please enter a valid location');
      })

    setLocation('');
  }


  return (
    <div className={classes.App}>
      <form className={classes.search} onSubmit={searchHandler}>
        <input
          type="text"
          onChange={locationHandler}
          value={location}
          placeholder="Enter Location"
        />
        <button>
          Get Weather
        </button>
      </form>
      <div className={classes.weather}>
        <div className={classes.details_1}>
          <div className={classes.location}>
            <p>{data.name}</p>
          </div>
          <div className={classes.temp}>
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className={classes.details_2}>
            <div className={classes.details}>
              {data.main ? <p className={classes.bold}>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className={classes.details}>
              {data.main ? <p className={classes.bold}>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className={classes.details}>
              {data.wind ? <p className={classes.bold}>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App
