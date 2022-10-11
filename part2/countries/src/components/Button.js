export const Button = ({ title, onClick, id }) => {
  return (
    <button onClick={onClick} id={id}>
      {title}
    </button>
  );
};
