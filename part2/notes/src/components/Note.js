const Note = ({ note, updateNote, deleteNote }) => {
  const label = note.important ? "important" : "not important";
  return (
    <div>
      <li className="note">{note.content}</li>
      <button onClick={updateNote}>{label}</button>
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
};

export default Note;
