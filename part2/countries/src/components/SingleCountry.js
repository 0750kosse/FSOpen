export const SingleCountry = ({ country }) => {
  const { name, capital, area, flag, latlng, languages } = country;
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
    </div>
  );
};
