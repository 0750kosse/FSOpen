const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')

const api = supertest(app)

describe('/GET tests', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('there are 0 notes in db', async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(1)
  })
  test('test contains HTMl is easy', async () => {
    const response = await api.get('/api/notes')
    expect(response.body[0].content).toContain('easy')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
