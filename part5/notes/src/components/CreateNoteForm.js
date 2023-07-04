const CreateNoteForm = ({addNote, newNote, handleNoteChange}) => {
  return (
    <>
    <h2>Create a new note</h2>
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">Save</button>
    </form>
  </>
  )
}


export default CreateNoteForm