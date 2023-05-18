import "./App.css";
import { useState, useEffect } from "react";

import Note from "./components/Note";
import notesServices from "./services/notes";
import loginServices from "./services/login";
import { Notification } from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUSer] = useState(null);

  useEffect(() => {
    notesServices.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUSer(user);
      notesServices.setToken(user.token);
    }
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input
          type="text"
          placeholder="Username"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          placeholder="Password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">Save</button>
    </form>
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginServices.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      notesServices.setToken(user.token);
      setUSer(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      {/* Notification will only show if trying to change deleted note */}
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.username} is logged in</p>
          {noteForm()}
        </div>
      )}

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
    </div>
  );
};

export default App;
