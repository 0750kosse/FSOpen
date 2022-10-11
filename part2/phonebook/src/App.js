import axios from "axios";
import { useState, useEffect } from "react";
import { Filter } from "./Filter";

import { Form } from "./Form";
import { ShowAllContacts } from "./ShowAllContacts";
import { ShowFilteredContacts } from "./ShowFilteredContacts";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filtered, setFiltered] = useState("");

  const getData = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response);
      setPersons(response.data);
    });
  };

  useEffect(getData, []);

  const handleInputName = (e) => {
    console.log(e.target.value);
    setNewName(e.target.value);
  };

  const handleInputNumber = (e) => {
    console.log(e.target.value);
    setPhoneNumber(e.target.value);
  };

  const handleInputFilter = (e) => {
    setFiltered(e.target.value);
  };

  const isRepeated = persons.some((person) => person.name === newName);

  const handleSubmitForm = (e) => {
    console.log("clicked");
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
