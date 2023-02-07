import { Person } from "./Person";

export const ShowAllContacts = ({ contacts, onClick, title }) => {
  //Checks contacts is array & not empty
  if (!Array.isArray(contacts) || !contacts.length)
    return <h1>No contacts mate</h1>;
  return contacts.map((person) => {
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
