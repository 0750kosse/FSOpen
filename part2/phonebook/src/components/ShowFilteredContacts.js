import { Person } from "./Person";

export const ShowFilteredContacts = ({ filteredNames }) => {
  return filteredNames.map((person) => {
    return <Person key={person.id} name={person.name} number={person.number} />;
  });
};
