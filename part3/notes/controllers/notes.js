const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (req, res) => {
  res.send('<h1>Express Application, add /api/notes to see the notes</h1>')
})

notesRouter.get('/', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes)
  })
})

notesRouter.get('/:id', (req, res, next) => {
  // Grabs id
  const id = req.params.id
  // finds the note with id === to params.id
  Note.findById(id)
    .then((notes) => {
      // if note exists, returns note or return not found
      notes ? res.json(notes) : res.status(404).end()
    })
    .catch((error) => {
      next(error)
    })
})

notesRouter.post('/', (req, res, next) => {
  const body = req.body
  // check if no note || no note content, then returns 404 & error message
  if (!body || !body.content || body.content.length === 0) {
    res.status(404).json({ error: 'note content is missing' })
  }
  // creates new note
  const noteToSave = new Note({
    content: body.content,
    date: new Date().toISOString(),
    important: typeof body.important !== 'undefined' ? body.important : false
  })

  // saving new note
  noteToSave.save().then((savedNote) => {
    res.json(savedNote)
  })
    .catch((error) => next(error))
})

notesRouter.put('/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id
  // contents of the updated note
  const note = {
    content: body.content,
    important: body.important
  }

  // findby... receives id, updated note contents, & new so this returns the updated note
  Note.findByIdAndUpdate(id, note, { new: true, runValidators: true })
  // send back updatedNote
    .then((updatedNote) => {
      res.status(200).json({ updatedNote })
    })
    .catch((error) => next(error))
})

notesRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Note.findByIdAndRemove(id)
    // send back deletedNote
    .then((deletedNote) => {
      res.json(deletedNote).status(204).end()
    })
    .catch((error) => next(error))
})

module.exports = notesRouter