import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: 1, phone: "12345678" },
  ]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleInputName = (e) => {
    setNewName(e.target.value);
  };

  const handleInputNumber = (e) => {
    setPhoneNumber(e.target.value);
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
  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person) => {
        return (
          <p key={person.id}>
            {person.name} : {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default App;
