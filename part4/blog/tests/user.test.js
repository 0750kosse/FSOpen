const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/User')
const { users, usersInDb } = require('./list_helper')

beforeEach(async () => {
  await User.deleteMany({})
  const userObject = users.map(item => new User(item))
  const promiseArray = userObject.map(item => item.save())
  await Promise.all(promiseArray)
})

describe('GET users', () => {
  test('gets all users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('returns the correct number of users', async () => {
    const { response } = await usersInDb()
    expect(response.body).toHaveLength(users.length)
  })
  test('expect username to be defined', async () => {
    const { contents } = await usersInDb()
    expect(contents[0].username).toBeDefined()
  })
})

describe('POST users', () => {
  test('a valid user can be created', async () => {
    const newUser = {
      username: 'MJ23',
      name: 'Michael Jordan',
      password: '123'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
  // Invalid users:
  // 1. if username is not unique
  // 2. if username or passowrd lenght < 3
  // 3. if no username or password
  test('user is not created if not unique username', async () => {
    const { contents } = await usersInDb()

    const newUser = {
      username: 'boris',
      name: 'Boris James',
      password: 'welcome124'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(contents[0].username).toContain(newUser.username)
    const usersAtEnd = await usersInDb()
    expect(usersAtEnd.response.body).toHaveLength(contents.length)
  })
  test('user is not created if missing username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: '',
      name: 'Jhon Doe',
      password: ''
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    const usersAtEnd = await usersInDb()
    expect(result.body).toEqual({ error: 'username and password are required fields' })
    expect(usersAtEnd.response.body).toHaveLength(usersAtStart.response.body.length)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
