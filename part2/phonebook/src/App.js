import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
  const [newName, setNewName] = useState("");

  const handleInputChange = (e) => {
    setNewName(e.target.value);
  };

  const isRepeated = persons.some((person) => person.name === newName);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newEntry = {
      name: newName,
      id: persons.length + 1,
    };

    isRepeated
      ? alert(`${newName} already exists`)
      : setPersons([...persons, newEntry]);
    setNewName("");
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmitForm}>
        <div>
          name: <input onChange={handleInputChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        console.log(persons);

        return <p key={person.id}>{person.name}</p>;
      })}
    </div>
  );
};

export default App;
