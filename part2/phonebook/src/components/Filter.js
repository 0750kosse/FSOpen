export const Filter = ({ title, onChange, filtered, required }) => {
  return (
    <div>
      <h3>{title}</h3>
      <input onChange={onChange} value={filtered} required={required} />
    </div>
  );
};
