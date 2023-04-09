const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  try {
    blogs.length > 0
      ? response.status(200).json(blogs)
      : response.json({ error: 'no blogs yet' })
  } catch (error) { next(error) }
})

blogsRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  try {
    blog ? response.json(blog) : response.status(404).end()
  } catch (error) { next(error) }
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

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const id = request.params.id

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true })

  try {
    if (blog) response.status(200).json({ updatedBlog })
  } catch (error) { next(error) }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findByIdAndDelete(id)

  try {
    if (blog) response.status(204).end()
  } catch (error) { next(error) }
})

module.exports = blogsRouter
