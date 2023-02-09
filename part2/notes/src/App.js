import "./App.css";
import { useState, useEffect } from "react";

import Note from "./components/Note";
import notesServices from "./services/notes";
import { Notification } from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    notesServices.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    notesServices
      .create(noteObject)
      .then((createdNote) => {
        setNotes([...notes, createdNote]);
        setNewNote("");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setErrorMessage(err.response.data.error);
      });
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportance = (id) => {
    //find note we want to modify
    const note = notes.find((note) => note.id === id);
    //create a new object, with same props as original, apart from the prop we want to update
    const updatedNote = { ...note, important: !note.important };
    notesServices
      .update(id, updatedNote)
      .then((result) => {
        setNotes(notes.map((note) => (note.id !== id ? note : result)));
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setErrorMessage(err.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleDeleteNote = (id) => {
    const note = notes.find((note) => note.id === id);
    notesServices
      .deleteNote(id)
      .then((notes) => setNotes(notes.filter((note) => note.id !== id)))
      //catches error & display temporary error message, then timeout sets error to null again
      .catch((e) => {
        setErrorMessage(`Note '${note.content}' was already deleted from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        // the deleted note gets filtered out from state
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      {/* Notification will only show if trying to change deleted note */}
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll(!showAll)}>
        show{showAll ? " not important" : " all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            updateNote={() => toggleImportance(note.id)}
            deleteNote={() => handleDeleteNote(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default App;
