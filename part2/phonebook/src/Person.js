export const Person = ({ id, name, number }) => {
  return (
    <div>
      <p id={id}>
        {name} : {number} : {id}
      </p>
    </div>
  );
};
