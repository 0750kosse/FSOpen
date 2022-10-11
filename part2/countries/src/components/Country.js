import { SingleCountry } from "./SingleCountry";
import { UnderTenCountries } from "./UnderTenCountries";

export const Country = ({ countries, onClick, weather }) => {
  const countriesToShow = countries.map((country) => {
    if (countries.length === 1)
      return (
        <SingleCountry
          country={country}
          key={country.latlng}
          weather={weather}
        />
      );
    else if (countries.length > 1 && countries.length <= 10)
      return (
        <UnderTenCountries
          country={country}
          key={country.latlng}
          onClick={onClick}
        />
      );
    return null;
  });
  return countriesToShow;
};
