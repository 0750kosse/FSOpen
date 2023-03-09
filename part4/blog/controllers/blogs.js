const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      blogs.length > 0
        ? response.status(200).json(blogs)
        : response.json({ error: 'no blogs yet' })
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      result
        ? response.status(201).json(result)
        : response.status(400).json({ error: 'malgormed data' })
    })
})

module.exports = blogsRouter
