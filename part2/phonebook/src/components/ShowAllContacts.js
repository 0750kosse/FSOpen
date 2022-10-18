import { Person } from "./Person";

export const ShowAllContacts = ({ persons }) => {
  return persons.map((person) => {
    return <Person key={person.id} name={person.name} number={person.number} />;
  });
};
