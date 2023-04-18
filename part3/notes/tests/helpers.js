const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
    date: new Date().toISOString(),
    userId: '643e843b07120aa460f5c088'
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
    date: new Date().toISOString(),
    userId: '643e843b07120aa460f5c088'
  }
]

const notesInDb = async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(note => note)
  return { response, contents }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { api, initialNotes, notesInDb, usersInDb }
