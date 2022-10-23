import { Person } from "./Person";

export const ShowAllContacts = ({ persons, onClick, title }) => {
  return persons.map((person) => {
    return (
      <Person
        key={person.name}
        name={person.name}
        number={person.number}
        title={title}
        onClick={() => onClick(person.id)}
      />
    );
  });
};
