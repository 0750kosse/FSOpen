import "./App.css";
import { useState, useEffect } from "react";
import contactService from "./services/contacts";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { ShowAllContacts } from "./components/ShowAllContacts";
import { ShowFilteredContacts } from "./components/ShowFilteredContacts";
import { Notification } from "./components/Notification";

const App = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filtered, setFiltered] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  //calls time out on error
  const errorTimeOut = () => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };
  //get data function, stores it on allcontacts state
  const getData = () => {
    contactService
      .getAllContacts()
      .then((contacts) => {
        setAllContacts(contacts);
      })
      .catch((err) => {
        console.log(err.response.data);
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
    const contact = allContacts.find((person) => person.id === id);
    window.confirm(`Do you want to delete ${contact.name}?`);
    contactService
      .deleteContact(id)
      .then(() =>
        setAllContacts(allContacts.filter((person) => person.id !== id))
      );
    setSuccessMessage(`Contact ${contact.name} successfully deleted`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };
  //refactored for easier readability/testing
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newEntry = {
      name: newName,
      number: phoneNumber,
    };
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
    return allContacts.some((person) => person.name === newName);
  };

  const handleUpdateContact = (id) => {
    // contact finds the person whose details will be updated & updatedContact returns the contact's updated contact details
    const contact = allContacts.find((person) => person.name === newName);
    const updatedContact = { ...contact, number: phoneNumber };
    window.confirm(
      `Do you want to update ${contact.name} with number : ${updatedContact.number}?`
    );
    contactService
      .updateContact(contact.id, updatedContact)
      .then((updatedContact) => {
        setAllContacts(
          allContacts.map((contact) =>
            contact.id !== id ? contact : { ...allContacts, updatedContact }
          )
        );
        setSuccessMessage(`Contact details for ${updatedContact.name} updated`);
        getData();
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          `Unable to update ${updatedContact.name}: Error: ${err.response.data.err}`
        );
        errorTimeOut();
      });
  };

  const handleCreateContact = (newEntry) => {
    contactService
      .createContact(newEntry)
      .then((newContact) => {
        // setPersons([...persons, newContact]);
        // SetAllcontacts: ensures we use the state last value
        setAllContacts((allContacts) => [...allContacts, newContact]);
        setSuccessMessage(`Added ${newContact.name}`);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          `Error: ${err.response.data.err}-Details for contact do not meet criteria: `
        );
        errorTimeOut();
      });
  };

  const filteredNames = allContacts.filter((person) => {
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
          contacts={allContacts}
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
