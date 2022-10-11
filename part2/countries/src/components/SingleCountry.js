export const SingleCountry = ({ country, weather }) => {
  const { name, capital, area, flag, latlng, languages } = country;

  const { main, wind } = weather;
  const icon = weather.weather[0].icon;

  const weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <div key={latlng}>
      <h3>{name.common}</h3>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <ul>
        languages :
        {Object.values(languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <picture>{flag}</picture>
      <div>
        <h3>Weather in {country.name.common}</h3>
        <p>Temperature: {main.temp}</p>
        <img src={weatherIcon} alt="Capital weather icon" />
        <p>Wind: {wind.speed}</p>
      </div>
    </div>
  );
};
