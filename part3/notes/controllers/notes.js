const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (req, res, next) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1,
    date: 1
  })
  try {
    res.status(200).json(notes)
  } catch (error) {
    next(error)
  }
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

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  // creates new note
  const noteToSave = new Note({
    content: body.content,
    user: user._id,
    important: typeof body.important !== 'undefined' ? body.important : false
  })

  // saving new note
  try {
    const newNote = await noteToSave.save()
    user.notes = user.notes.concat(newNote._id)

    await user.save()
    response.status(201).json(newNote)
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
  const updatedNote = await Note.findByIdAndUpdate(id, note, {
    new: true,
    runValidators: true
  })
  try {
    res.status(200).json({ updatedNote })
  } catch (error) {
    next(error)
  }
})

notesRouter.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    await Note.findByIdAndRemove(id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = notesRouter
