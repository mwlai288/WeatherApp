import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import moment from "moment";

const SearchCity = () => {
  const { dispatch, currentWeather, fiveDay } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [farenheit, setFarenheit] = useState(true);

  const searchCity = async (search: string): Promise<[]> => {
    const res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${process.env.REACT_APP_WEATHER_KEY}&units=imperial`
    );

    dispatch({
      type: "search",
      payload: res.data,
    });

    return res.data;
  };

  const getForecast = async (search: string): Promise<[]> => {
    const forecastData = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${search}&APPID=${process.env.REACT_APP_WEATHER_KEY}&units=imperial`
    );

    dispatch({
      type: "forecast",
      payload: forecastData.data.list,
    });

    console.log(fiveDay.list);

    return forecastData.data;
  };

  const calculateTime = (time: number) => {
    let date = moment.unix(time).format("ddd MMM DD");
    return date;
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          name="search"
          value={search}
          placeholder="Search... ex. Melbourne, US"
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button
          type="submit"
          className="button-search"
          onClick={() => searchCity(search)}
        >
          Search
        </button>
      </div>
      <section>
        {currentWeather.length !== 0 ? (
          <>
            <div className="location-box">
              <h2 className="location">
                {currentWeather?.name}, {currentWeather?.sys.country}{" "}
              </h2>
              <p className="date">{new Date().toDateString()}</p>
            </div>
            <div className="weather-box">
              <p className="temp">
                {currentWeather?.main
                  ? farenheit
                    ? Math.round(currentWeather?.main.temp)
                    : Math.round((currentWeather?.main.temp - 32) * (5 / 9))
                  : null}
                {currentWeather.main && (
                  <>
                    {" "}
                    <span className="scale">
                      <span onClick={() => setFarenheit(true)}>&#176;F</span> |
                      <span onClick={() => setFarenheit(false)}>&#176;C</span>
                    </span>
                  </>
                )}
              </p>
            </div>
            <button
              className="forecast-button"
              onClick={() => getForecast(search)}
            >
              Get 5 Day Forecast
            </button>
          </>
        ) : null}
        <section className="forecast">
          {fiveDay[37] ? (
            <>
              <div className="forecast-box">
                <p className="date">{calculateTime(fiveDay[0].dt)}</p>
                <h4 className="temp">{Math.round(fiveDay[0].main.temp_max)}</h4>
                <img
                  src={
                    "http://openweathermap.org/img/w/" +
                    fiveDay[0].weather[0].icon +
                    ".png"
                  }
                  alt="weather icon"
                />
                <h4 className="temp">{Math.round(fiveDay[0].main.temp_min)}</h4>
              </div>
              <div>
                <p className="date">{calculateTime(fiveDay[8].dt)}</p>
                <h4 className="temp">{Math.round(fiveDay[8].main.temp_max)}</h4>
                <img
                  src={
                    "http://openweathermap.org/img/w/" +
                    fiveDay[8].weather[0].icon +
                    ".png"
                  }
                  alt="weather icon"
                />
                <h4 className="temp">{Math.round(fiveDay[8].main.temp_min)}</h4>
              </div>
              <div>
                <p className="date">{calculateTime(fiveDay[16].dt)}</p>
                <h4 className="temp">
                  {Math.round(fiveDay[16].main.temp_max)}
                </h4>
                <img
                  src={
                    "http://openweathermap.org/img/w/" +
                    fiveDay[16].weather[0].icon +
                    ".png"
                  }
                  alt="weather icon"
                />
                <h4 className="temp">
                  {Math.round(fiveDay[16].main.temp_min)}
                </h4>
              </div>
              <div>
                <p className="date">{calculateTime(fiveDay[24].dt)}</p>
                <h4 className="temp">
                  {Math.round(fiveDay[24].main.temp_max)}
                </h4>
                <img
                  src={
                    "http://openweathermap.org/img/w/" +
                    fiveDay[24].weather[0].icon +
                    ".png"
                  }
                  alt="weather icon"
                />
                <h4 className="temp">
                  {Math.round(fiveDay[24].main.temp_min)}
                </h4>
              </div>
              <div>
                <p className="date">{calculateTime(fiveDay[32].dt)}</p>
                <h4 className="temp">
                  {Math.round(fiveDay[32].main.temp_max)}
                </h4>
                <img
                  src={
                    "http://openweathermap.org/img/w/" +
                    fiveDay[32].weather[0].icon +
                    ".png"
                  }
                  alt="weather icon"
                />
                <h4 className="temp">
                  {Math.round(fiveDay[32].main.temp_min)}
                </h4>
              </div>
            </>
          ) : null}
        </section>
      </section>
    </>
  );
};

export default SearchCity;
