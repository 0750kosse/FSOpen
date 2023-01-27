import "./App.css";
import { useState, useEffect } from "react";
import contactService from "./services/contacts";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { ShowAllContacts } from "./components/ShowAllContacts";
import { ShowFilteredContacts } from "./components/ShowFilteredContacts";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filtered, setFiltered] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    setSuccessMessage(`Contact  ${contact.name} successfully deleted`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newEntry = {
      name: newName,
      number: phoneNumber,
    };
    //checks if newEntry lenght is valid
    if (!validateFormData(newEntry)) {
      return;
    }
    //if contact exists, updates contact, else new contact
    if (isContactRepeated(newEntry)) {
      handleUpdateContact();
    } else {
      handleCreateContact(newEntry);
    }
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);

    e.target.reset();
  };
  //Checks if contact is repeated
  const isContactRepeated = (newEntry) => {
    return persons.some((person) => person.name === newName);
  };
  //Validates newEntry to ensure newEntry lenght is > 3 or returns error
  const validateFormData = (newEntry) => {
    let isValid = true;
    if (newEntry.name.length < 3) {
      isValid = false;
      setErrorMessage("Name must be at least 3 chars long");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    return isValid;
  };
  const handleUpdateContact = (id) => {
    // contact finds the person whose details will be updated & updatedContact returns the contact's updated contact details
    const contact = persons.find((person) => person.name === newName);
    const updatedContact = { ...contact, number: phoneNumber };

    window.confirm(
      `Do you want to update ${contact.name} with number : ${updatedContact.number}?`
    );
    contactService
      .updateContact(contact.id, updatedContact)
      .then((updatedContact) => {
        setPersons(
          persons.map((contact) =>
            contact.id !== id ? contact : { ...persons, updatedContact }
          )
        );

        setSuccessMessage(`Contact details for ${updatedContact.name} updated`);
        getData();
      })
      .catch((error) => {
        setErrorMessage(
          `Contact ${updatedContact.name} was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleCreateContact = (newEntry) => {
    contactService
      .createContact(newEntry)
      .then((newContact) => {
        // setPersons([...persons, newContact]);
        // 126: ensures we use the state last value
        setPersons((persons) => [...persons, newContact]);
        setSuccessMessage(`Added ${newContact.name}`);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setErrorMessage(err.response.data.error);
      });
  };

  const filteredNames = persons.filter((person) => {
    return person.name.toLowerCase().includes(filtered.toLowerCase());
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} error />
      <Notification message={successMessage} success />
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
