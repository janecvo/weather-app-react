import React, { useState } from "react";
const api = {
  key: "089afca0039437fccbbf55ef947f7695",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [zip, setZip] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?zip=${zip}&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setZip("");
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let time = d.getHours() + ":" + d.getMinutes();

    return `${day} ${date} ${month} ${year} ${time}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 70          
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setZip(e.target.value)}
            value={zip}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp * 1.8 - 459.67)}°F
                
                <div className="feelsLike">
                  Low: {Math.round(weather.main.temp_min * 1.8 - 459.67)}°F {}
                  High: {Math.round(weather.main.temp_max * 1.8 - 459.67)}°F
                </div>
                <div className="feelsLike">
                  Feels like{" "}
                  {Math.round(weather.main.feels_like * 1.8 - 459.67)}°F
                </div>
              </div>
              <div className="weather">{weather.weather[0].main} 
              </div>
              <div className="statbox">
                <p className="humidity">Humidity: {weather.main.humidity}% </p>
              <p className="wind">Wind: {Math.round(weather.wind.speed)}mph</p>
              </div>
              
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
