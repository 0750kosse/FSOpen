const express = require("express");
const app = express();
const cors = require("cors");
//json parser to access data easily, otherwise would b undefined
app.use(express.json());
app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy ",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript ",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Express Application, add /api/notes to see the notes</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  //Saves id param & converts to number
  const id = Number(req.params.id);
  // finds the note with id equal to params.id
  const note = notes.find((note) => note.id === id);
  //if exists, returns note or not found
  note ? res.json(note) : res.status(404).end();
  // ******    check notes : re return to avoid saving malformated data???
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  //check if no note || no note content, then returns 404 & error message
  if (!note || !note.content) {
    res.status(404).json({ error: "note content is missing" });
  }
  //ids const finds array of id, maxId finds max id
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);

  const newNote = {
    id: maxId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== "undefined" ? note.important : false,
  };
  notes = [...notes, newNote];
  res.status(201).json(newNote);
});

app.delete("/api/notes/:id", (req, res) => {
  //Saves id param & converts to number
  const id = Number(req.params.id);
  //returns new array filtering out the selected note
  const note = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: " unknown endpoint" });
};

app.use(unknownEndPoint);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
