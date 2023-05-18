const mongoose = require('mongoose')
const Note = require('../models/note')
const { notesInDb } = require('./helpers')
const initialNotes = require('./helpers').initialNotes
const api = require('./helpers').api

beforeEach(async () => {
  await Note.deleteMany({})

  // Parallel -- (might not respect saving order)
  const noteObjects = initialNotes.map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)

  // Sequential --  (respects saving order)
  // for (const note of initialNotes) {
  //   const noteObject = new Note(note)
  //   await noteObject.save()
  //   console.log("saved!")}
})

describe('GET/', () => {
  test('notes are returned as Json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const { response } = await notesInDb()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('note to contain `easy`', async () => {
    const { response, contents } = await notesInDb()
    const noteToTest = contents.map(note => note.content)
    expect(response.body[1].content).toContain(noteToTest[1])
  })
})

describe('GET/:id', () => {
  test('returns specified note', async () => {
    const { response } = await notesInDb()
    const noteToView = response.body[1]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
    expect(resultNote.body.content).toContain(noteToView.content)
  })
})

describe('POST/', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'Node testing with Jest',
      important: true,
      date: new Date(),
      user: '643e843b07120aa460f5c088'

    }
    await api.post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response } = await notesInDb()
    expect(response.body).toHaveLength(initialNotes.length + 1)
  })
  test('a not valid note cannot be added', async () => {
    const newNote = {
      important: true
    }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('initialNotes length unaltered when invalid note', async () => {
    const newNote = { important: true }
    await api
      .post('/api/notes')
      .send(newNote)

    const { response } = await notesInDb()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETE', () => {
  test('a note can be deleted', async () => {
    const { contents } = await notesInDb()
    // select note whose id will be tested
    const noteToDelete = contents[1]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await api.get('/api/notes')

    expect(notesAtEnd.body).toHaveLength(initialNotes.length - 1)
    expect(notesAtEnd.body).not.toContain(noteToDelete)
  })
})

describe('PUT', () => {
  test('updates existing note', async () => {
    const response = await api.get('/api/notes')
    const contents = response.body.map(note => note)

    const noteToUpdate = contents[1]

    const updatedNote = {
      content: 'Redux is fab',
      important: true,
      id: '6417683a82b66e271f3a1c1d'
    }
    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send(updatedNote)
      .expect(200)

    const notesAfterUpdate = await api.get('/api/notes')

    expect(notesAfterUpdate.body).not.toContain(noteToUpdate)
    expect(notesAfterUpdate.body).toHaveLength(initialNotes.length)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
