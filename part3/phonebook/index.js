require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Contact = require('./models/contact')
const errorHandler = require('./middleware/errorHandler')
const unknownEndPoint = require('./middleware/unknownEndoint')
// order of middleware IS IMPORTANT
app.use(express.json())
app.use(cors())
// logging data for exercise, but beware of data privacy GDPR!!!
morgan.token('data', function data (req) {
  return JSON.stringify({
    name: req.body.name,
    number: req.body.number
  })
})

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms - :data'
  )
)

app.get('/info', (req, res) => {
  const timeOfRequest = new Date().toUTCString()
  Contact.find({}).then((allContacts) => {
    res.send(`
    <h3>Phonebook has info for ${allContacts.length} people</h3>
    <p>${timeOfRequest}</p>
    `)
  })
})

app.get('/api/persons', (req, res, next) => {
  Contact.find({})
    .then((allContacts) => {
      if (Array.isArray(allContacts) && allContacts.length > 1) {
        res.status(200).send(allContacts)
      } else {
        console.log(res)
        res.status(404).send({ contacts: 'no data yet' })
      }
    })
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Contact.findById(id)
    .then((contacts) => {
      contacts ? res.json(contacts) : res.status(404).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', async (req, res, next) => {
  const phonebook = new Contact(req.body)
  // Finds all contacts from db & checks if newContact.name exists
  const existingContacts = await Contact.find({})
  const contactExists = existingContacts.some(
    (person) => person.name === phonebook.name
  )

  const err = phonebook.validateSync()

  // try-catch block not strictly necessary, but good practice for handling errors
  if (!contactExists) {
    try {
      const savedContact = await phonebook.save()
      res.status(201).send(savedContact)
    } catch (err) {
      next(err)
    }
  }
  next(err)
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id

  const updatedContact = {
    name: body.name,
    number: body.number
  }

  Contact.findByIdAndUpdate(id, updatedContact, {
    runValidators: true,
    new: true
  })
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      next(err)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).json(result).end()
    })
    .catch((err) => next(err))
})

app.use(unknownEndPoint)
// error handler middleware has to always be the LAST loaded middleware
app.use(errorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
