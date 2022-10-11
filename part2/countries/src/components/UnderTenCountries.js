import { Button } from "./Button";

export const UnderTenCountries = ({ country, onClick }) => {
  const { latlng, name } = country;
  return (
    <div key={latlng} className="country-container">
      <p className="country-name">{name.common}</p>
      <Button
        className="country-button"
        title="Show Detail"
        id={country.latlng}
        onClick={() => onClick(name.common)}
      />
    </div>
  );
};
