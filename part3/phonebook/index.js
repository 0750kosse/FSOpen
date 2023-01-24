require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Contact = require("./models/contact");

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

app.get("/info", (req, res) => {
  const timeOfRequest = new Date().toUTCString();
  Contact.find({}).then((allContacts) => {
    res.send(` 
    <h3>Phonebook has info for ${allContacts.length} people</h3>
    <p>${timeOfRequest}</p>
    `);
  });
});

app.get("/api/persons", (req, res) => {
  Contact.find({}).then((allContacts) => {
    allContacts.length > 0
      ? res.json(allContacts)
      : res.send("no contacts found");
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  Contact.findById(id)
    .then((contacts) => {
      contacts ? res.json(contacts) : res.status(404).end();
    })
    .catch((err) => {
      res.status(404).send({ error: "malformated id" });
    });
});

app.post("/api/persons", async (req, res) => {
  const body = req.body;
  //creates newContact with 'body' data
  const newContact = new Contact({
    name: body.name,
    number: body.number,
  });
  //Finds all contacts from db & checks if newContact.name exists
  const existingContacts = await Contact.find({});
  const contactExists = existingContacts.some(
    (person) => person.name === newContact.name
  );

  if (!body.name || !body.number) {
    res.status(400).json({ error: "name and number fields compulsory" });
  } else if (contactExists) {
    res.status(400).json({ error: "name must be unique" });
  } else {
    //try-catch block not strictly necessary, but good practice for handling errors
    try {
      const savedContact = await newContact.save();
      res.status(201).json(savedContact);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
});

app.delete("/api/persons/:id", (req, res) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((err) => console.log(err));
});

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: " unknown endpoint" });
};

app.use(unknownEndPoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
