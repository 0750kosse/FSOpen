import "./App.css";
import { useState, useEffect,useRef } from "react";
import Note from "./components/Note";
import notesServices from "./services/notes";
import loginServices from "./services/login";
import { Notification } from "./components/Notification";
import LoginForm from "./components/LoginForm";
import LogOut from "./components/Logout";
import Toggable from "./components/Toggable";
import CreateNoteForm from './components/CreateNoteForm'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    notesServices.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      notesServices.setToken(user.token);
    }
  }, []);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
   notesServices
   .create(noteObject)
   .then((createdNote) => {
      setNotes([...notes, createdNote]);
   });
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginServices.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      notesServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

const handleLogOut = (e)=> {
  e.preventDefault()
  window.localStorage.clear()
  setUser(null)
}

const noteFormRef= useRef()

 return (
     <div>
      <h1>Notes</h1>
      {/* Notification will only show if trying to change deleted note */}
      <Notification message={errorMessage} />

      {user === null && 
   <Toggable buttonLabel='Login'>
      <LoginForm 
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
  />
  </Toggable>}
      {user && (
        <div>
          <p>{user.username} is logged in</p>
          <LogOut handleLogOut={handleLogOut}/>
          
          <Toggable buttonLabel='Create New Note' ref={noteFormRef}>
            <CreateNoteForm 
              addNote={addNote}
            
/>
          </Toggable>
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
