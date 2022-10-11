import { useState } from "react";
import { Filter } from "./Filter";
import { Form } from "./Form";
import { ShowAllContacts } from "./ShowAllContacts";
import { ShowFilteredContacts } from "./ShowFilteredContacts";

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter
          title="Filter by name:"
          onChange={handleInputFilter}
          value={filtered}
          required
        />
      </div>
      <h3>Add a new</h3>
      <div>
        <Form
          onSubmit={handleSubmitForm}
          onNameInput={handleInputName}
          nameValue={newName}
          required
          onNumberInput={handleInputNumber}
          numberValue={phoneNumber}
          type="number"
        />
      </div>

      <h3>Numbers</h3>
      {filtered.length === 0 ? (
        <ShowAllContacts persons={persons} />
      ) : (
        <ShowFilteredContacts filteredNames={filteredNames} persons={persons} />
      )}
    </div>
  );
};

export default App;
