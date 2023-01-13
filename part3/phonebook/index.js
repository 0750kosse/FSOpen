const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(cors());
//logging data for exercise, but beware of data privacy GDPR!!!
morgan.token("data", function data(req) {
  return JSON.stringify({
    name: req.body.name,
    number: req.body.number,
  });
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - :data"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const timeOfRequest = new Date().toUTCString();
  res.send(`
  <h3>Phonebook has info for ${persons.length} people</h3>
  <p>${timeOfRequest}</p>
 `);
});

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    res.status(404);
  }
  res.json(person);
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  const randomId = Math.round(Math.random() * (1000 - 5) + 5);

  const newPerson = {
    id: randomId,
    name: person.name,
    number: person.number,
  };

  const personExists = persons.some((person) => person.name === newPerson.name);

  if (!person.name || !person.number) {
    res.status(400).json({ error: "name and number fields compulsory" });
  } else if (personExists) {
    res.status(400).json({ error: "name must be unique" });
  }

  persons = [...persons, newPerson];
  res.status(201).json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.filter((person) => person.id === id);
  if (person.length === 0) {
    res.status(404).json({ error: "id not found" });
  } else res.status(204).end();
});

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: " unknown endpoint" });
};

app.use(unknownEndPoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
