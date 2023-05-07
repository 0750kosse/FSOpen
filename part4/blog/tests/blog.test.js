const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const { blogs, blogsInDb, usersInDb } = require('./list_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObject = blogs.map(item => new Blog(item))
  const promiseArray = blogObject.map(item => item.save())
  await Promise.all(promiseArray)
})

describe('GET tests', () => {
  test('returns all blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the correct number of blogs', async () => {
    const { response } = await blogsInDb()
    expect(response.body).toHaveLength(blogs.length)
  })

  test('ensures that unique identifier is id, not _id', async () => {
    const { contents } = await blogsInDb()

    expect(contents[0].id).toBeDefined()
  })
})

describe('GET by id', () => {
  test('gets blog by id', async () => {
    const { response } = await blogsInDb()
    const blogToView = response.body[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)

    expect(resultBlog.body.title).toEqual(blogToView.title)
  })
})

describe('POST tests', () => {
  test('post succesfully creates new blog', async () => {
    const blogsAtStart = await blogsInDb()
    const { response } = await usersInDb()

    const newBlog = {
      title: 'Romancero Gitano',
      author: 'Lorca',
      url: 'http:/blablabla/05/01/Cervantes.html',
      likes: 200,
      user: response.body[0].id
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd.response.body).toHaveLength(blogsAtStart.response.body.length + 1)
    expect(blogsAtEnd.response.body[6].title).toContain(newBlog.title)
  })
  test('iF likes property is missing, it will default to 0', async () => {
    const { response } = await usersInDb()

    const noLikesBlog = {
      title: 'la guerra de las galaxias',
      author: 'orwell',
      url: 'http:/blablabla/05/01/orwell.html',
      user: response.body[0].id
    }

    await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb()
    const lastBlog = blogs.response.body[blogs.response.body.length - 1]

    expect(lastBlog.likes).toBe(0)
  })

  test('if no title or url props or user, return status 400', async () => {
    const { response } = await usersInDb()

    const missingPropsBlog = {
      author: 'orwell',
      likes: 400,
      user: response.body[0].id
    }

    await api
      .post('/api/blogs')
      .send(missingPropsBlog)
      .expect(400)
  })
})

describe('PUT tests', () => {
  test('updates blog', async () => {
    const { response } = await blogsInDb()
    const blogToUpdate = response.body[0]

    const updatedBlog = {
      title: 'React patterns UPDATED',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 400,
      id: '5a422a851b54a676234d17f7'
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogListUpdated = await blogsInDb()
    expect(blogListUpdated.response.body[0].title).toContain(updatedBlog.title)
  })
})

describe('DELETES test', () => {
  test('deletes a blog', async () => {
    const { response } = await blogsInDb()
    const noteToDelete = response.body[0]

    await api
      .delete(`/api/blogs/${noteToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.response.body).toHaveLength(response.body.length - 1)
  })
})

afterAll(async () => {
  mongoose.connection.close()
  console.log('connection closed')
})
