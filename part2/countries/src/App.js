import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Country } from "./components/Country";

const apiKey = process.env.REACT_APP_APIKEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [weather, setWeather] = useState({});
  // If userInput exists, fetches countries info & the weather of the users input country  & 'sets' it to state
  const getData = () => {
    let capital;
    if (userInput)
      axios
        .get(`https://restcountries.com/v3.1/name/${userInput}`)
        .then((res) => {
          capital = res.data[0].capital;
          setCountries(res.data);
        })
        .then((res) => {
          return axios
            .get(
              `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&uk&APPID=${apiKey}`
            )
            .then((res) => {
              setWeather(res.data);
            });
        });
  };

  // Grab userInput
  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = (countryName) => {
    setUserInput(countryName);
  };
  // useEffect only fires whenever userInput is changed
  useEffect(getData, [userInput]);
  // console.log(weather);
  return (
    <div className="App">
      <header className="App-header">Country finder</header>
      <input onChange={handleChange} />
      {countries.length > 10 ? (
        <p>Too many results,keep typing to narrow your search</p>
      ) : (
        <Country
          countries={countries}
          onClick={handleClick}
          weather={weather}
        />
      )}
    </div>
  );
};

export default App;
