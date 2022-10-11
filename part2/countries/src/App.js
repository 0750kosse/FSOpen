import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Country } from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [userInput, setUserInput] = useState("");

  const getData = () => {
    if (userInput)
      axios
        .get(`https://restcountries.com/v3.1/name/${userInput}`)
        .then((res) => {
          setCountries(res.data);
        });
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(getData, [userInput]);

  return (
    <div className="App">
      <header className="App-header">Country finder</header>
      <input onChange={handleChange} />
      {countries.length > 10 ? (
        <p>Too many results,keep typing to narrow your search</p>
      ) : (
        <Country countries={countries} />
      )}
    </div>
  );
};

export default App;
