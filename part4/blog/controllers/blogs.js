const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  try {
    if (blogs.length > 0) {
      response.status(200).json(blogs)
    } else {
      response.json({ error: 'no blogs yet' })
    }
  } catch (error) { next(error) }
})

blogsRouter.get('/:id', (request, response, next) => {
  const id = request.params.id
  Blog
    .findById(id)
    .then((blogs) => {
      blogs ? response.json(blogs) : response.status(404).end()
    })
    .catch((error) => {
      next(error)
    })
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = await new Blog(request.body)
  if (!blog.likes) blog.likes = 0

  try {
    if (!blog.title || !blog.url) {
      response.status(400).json()
    } else if (blog) {
      blog.save()
      response.status(201).json()
    }
  } catch (error) { next(error) }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog
    .findByIdAndUpdate(id, blog, { new: true, runValidators: true })
    .then((updatedBlog) => {
      response.status(200).json({ updatedBlog })
    })
    .catch((error) => {
      next(error)
    })
})

blogsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Blog
    .findByIdAndDelete(id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => {
      next(error)
    })
})

module.exports = blogsRouter
