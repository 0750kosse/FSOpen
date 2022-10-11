import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
    { name: "Arto Hellas", number: "040-123456", id: 5 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 6 },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  const handleInputName = (e) => {
    setNewName(e.target.value);
  };

  const handleInputNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleInputFilter = (e) => {
    setFiltered(e.target.value);
  };

  const isRepeated = persons.some((person) => person.name === newName);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newEntry = {
      name: newName,
      id: persons.length + 1,
      number: phoneNumber,
    };

    isRepeated
      ? alert(`${newName} already exists`)
      : setPersons([...persons, newEntry]);
    setNewName("");
    setPhoneNumber("");
  };

  const filteredNames = persons.filter((person) => {
    return person.name.toLowerCase().includes(filtered.toLowerCase());
  });

  const ShowFilteredContacts = () => {
    return filteredNames.map((person) => {
      return (
        <p key={person.id}>
          {person.name} : {person.number}
        </p>
      );
    });
  };

  const ShowAllContacts = () => {
    return persons.map((person) => {
      return (
        <p key={person.id}>
          {person.name} : {person.number}
        </p>
      );
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter by name:{" "}
        <input onChange={handleInputFilter} value={filtered} required />
      </div>
      {}
      <br />
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input onChange={handleInputName} value={newName} required />
        </div>
        <div>
          phone:
          <input
            onChange={handleInputNumber}
            value={phoneNumber}
            type="number"
            required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filtered.length === 0 ? <ShowAllContacts /> : <ShowFilteredContacts />}
    </div>
  );
};

export default App;
