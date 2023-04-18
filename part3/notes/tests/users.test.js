const User = require('../models/user')
const api = require('./helpers').api
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const usersInDb = require('./helpers').usersInDb

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('mypassword', 10)
  const user = new User({ username: 'root', name: 'LEo', passwordHash })

  await user.save()
})

describe('POST USER', () => {
  test('creates user succesfully', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'Jsoe',
      name: ' Pep',
      password: 'holaQueTal'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails if username is already taken', async () => {
    const usersAtStart = await usersInDb()

    const user = {
      username: 'root',
      name: 'LEo',
      password: 'messipassword'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Error, expected `username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
