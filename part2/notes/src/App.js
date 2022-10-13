import { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);

  const getData = () => {
    axios.get("http://localhost:3001/notes").then((res) => setNotes(res.data));
  };

  useEffect(getData, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    axios.post("http://localhost:3001/notes", noteObject).then((res) => {
      setNotes([...notes, noteObject]);
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
    const url = `http://localhost:3001/notes/${id}`;
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };
    axios
      .put(url, changedNote)
      .then((res) =>
        setNotes(notes.map((note) => (note.id !== id ? note : res.data)))
      );
  };

  return (
    <div>
      <h1>Notes</h1>
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
