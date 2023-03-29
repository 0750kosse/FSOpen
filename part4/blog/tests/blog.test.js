const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { blogs, blogsInDb } = require('./list_helper')

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

describe('POST tests', () => {
  test('post succesfully creates new blog', async () => {
    const newBlog = {
      title: 'Romancero Gitano',
      author: 'Lorca',
      url: 'http:/blablabla/05/01/Cervantes.html',
      likes: 200
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { response } = await blogsInDb()
    const contents = response.body.map(blogContent => blogContent.title)

    expect(response.body).toHaveLength(blogs.length + 1)
    expect(contents).toContain(newBlog.title)
  })
  test('iF likes property is missing, it will default to 0', async () => {
    const noLikesBlog = {
      title: 'la guerra de las galaxias',
      author: 'orwell',
      url: 'http:/blablabla/05/01/orwell.html'
    }

    await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(201)

    const { response } = await blogsInDb()
    const addedBlog = await response.body.find(blog => blog.title === 'la guerra de las galaxias')
    expect(addedBlog.likes).toBe(0)
  })

  test('if no title or url props, return status 400', async () => {
    const missingPropsBlog = {
      author: 'orwell',
      likes: 400
    }

    await api
      .post('/api/blogs')
      .send(missingPropsBlog)
      .expect(400)
  })
})

afterAll(async () => {
  mongoose.connection.close()
  console.log('connection closed')
})