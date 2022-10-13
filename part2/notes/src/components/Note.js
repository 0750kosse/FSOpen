const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "important" : "not important";
  return (
    <div>
      <li>{note.content}</li>
      <button onClick={toggleImportance}>{label}</button>
    </div>
  );
};

export default Note;
