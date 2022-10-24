import "./App.css";
import { useState, useEffect } from "react";

import Note from "./components/Note";
import notesServices from "./services/notes";
import { Notification } from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
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
      id: notes.length + 1,
    };

    notesServices.create(noteObject).then((createdNote) => {
      setNotes([...notes, createdNote]);
      setNewNote("");
    });
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    notesServices
      .update(id, changedNote)
      .then((changedNote) =>
        setNotes(notes.map((note) => (note.id !== id ? note : changedNote)))
      )
      //catches error & display temporary error message, then timeout sets error to null again
      .catch((e) => {
        setErrorMessage(`Note ${note.content} was already deleted from server`);
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
        show{showAll ? " important" : " all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
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
