import { Input } from "./Input";

export const Form = ({
  onSubmit,
  onNameInput,
  onNumberInput,
  value,
  type,
  required,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Input onChange={onNameInput} value={value} required={required} />

        <Input
          onChange={onNumberInput}
          value={value}
          required={required}
          type={type}
        />

        <button type="submit">add</button>
      </form>
    </div>
  );
};
