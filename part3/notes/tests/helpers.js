const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const notesInDb = async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(note => note)
  return { response, contents }
}

module.exports = { api, initialNotes, notesInDb }
