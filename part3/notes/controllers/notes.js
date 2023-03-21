const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.status(200).json(notes)
})

notesRouter.get('/:id', async (req, res, next) => {
  try {
    // Grabs id
    const id = req.params.id
    // finds the note with id === to params.id
    const selectedNote = await Note.findById(id)
    selectedNote ? res.json(selectedNote) : res.status(404).end()
  } catch (error) {
    next(error)
  }
})

notesRouter.post('/', async (req, res, next) => {
  const body = req.body
  // creates new note
  const noteToSave = new Note({
    content: body.content,
    date: new Date().toISOString(),
    important: typeof body.important !== 'undefined' ? body.important : false
  })
  // saving new note
  try {
    const newNote = await noteToSave.save()
    res.status(201).json(newNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const id = req.params.id
  // contents of the updated note
  const note = {
    content: body.content,
    important: body.important
  }

  // findby... receives id, updated note contents, & new so this returns the updated note
  const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true, runValidators: true })
  try {
    res.status(200).json({ updatedNote })
  } catch (error) { next(error) }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Note.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) { next(error) }
})

module.exports = notesRouter
