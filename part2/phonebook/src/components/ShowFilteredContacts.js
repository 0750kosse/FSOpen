import { Person } from "./Person";

export const ShowFilteredContacts = ({ filteredNames, title, onClick }) => {
  return filteredNames.map((person) => {
    return (
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        title={title}
        onClick={() => onClick(person.id)}
      />
    );
  });
};
