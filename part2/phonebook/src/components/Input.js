export const Input = ({ onChange, value, required, type }) => {
  return (
    <div>
      <input
        onChange={onChange}
        value={value}
        required={required}
        type={type}
      />
    </div>
  );
};
