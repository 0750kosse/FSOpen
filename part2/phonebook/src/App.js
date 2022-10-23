import "./App.css";
import { useState, useEffect } from "react";
import contactService from "./services/contacts";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { ShowAllContacts } from "./components/ShowAllContacts";
import { ShowFilteredContacts } from "./components/ShowFilteredContacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  const getData = () => {
    contactService.getAllContacts().then((initialContacts) => {
      setPersons(initialContacts);
    });
  };

  useEffect(getData, []);

  const handleInputName = (e) => {
    setNewName(e.target.value);
  };

  const handleInputNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleInputFilter = (e) => {
    setFiltered(e.target.value);
  };

  const handleDeleteContact = (id) => {
    //find the person which id equals 'id'
    const contact = persons.find((person) => person.id === id);
    window.confirm(`Do you want to delete ${contact.name}?`);
    contactService
      .deleteContact(id)
      .then(() => setPersons(persons.filter((person) => person.id !== id)));
  };

  const isRepeated = persons.some((person) => person.name === newName);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newEntry = {
      name: newName,
      number: phoneNumber,
    };

    isRepeated
      ? alert(`${newName} already exists`)
      : setPersons([...persons, newEntry]);

    e.target.reset();

    contactService
      .createContact(newEntry)
      .then((newContact) => setPersons([...persons, newContact]));
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
        <ShowAllContacts
          persons={persons}
          onClick={handleDeleteContact}
          title="delete"
        />
      ) : (
        <ShowFilteredContacts
          filteredNames={filteredNames}
          onClick={handleDeleteContact}
          title="delete"
        />
      )}
    </div>
  );
};

export default App;
