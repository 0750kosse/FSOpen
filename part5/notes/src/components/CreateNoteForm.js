import { useState } from "react";

const CreateNoteForm = ({addNote}) => {

  const [newNote, setNewNote] = useState("a new note");

  const handleChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleSubmit =(e)=> {
    e.preventDefault()
    const noteObject = {
        content: newNote,
        important: Math.random() < 0.5,
      };
      addNote(noteObject)
      setNewNote("");
    }
    return (
    <>
    <h2>Create a new note</h2>
    <form onSubmit={handleSubmit}>
      <input value={newNote} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  </>
  )
}


export default CreateNoteForm