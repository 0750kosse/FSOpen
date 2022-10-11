export const UnderTenCountries = ({ country }) => {
  const { latlng, name } = country;
  return (
    <div key={latlng}>
      <p>{name.common}</p>
    </div>
  );
};
