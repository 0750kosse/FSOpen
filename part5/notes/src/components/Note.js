const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "important" : "not important";
  return (
    <div>
      <li className="note">{note.content}</li>
      <button onClick={toggleImportance}>{label}</button>
    </div>
  );
};

export default Note;
