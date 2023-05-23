const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
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

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const { userId } = request

  const user = await User.findById(userId)

  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!blog.likes) blog.likes = 0

  try {
    if (!blog.title || !blog.url) {
      response.status(400).json({ error: 'title and url required' })
    } else if (blog) {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    }
  } catch (error) { next(error) }
})

blogsRouter.put('/:id', userExtractor, async (request, response, next) => {
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

blogsRouter.delete('/:id', userExtractor, async (req, res, next) => {
  try {
    const userid = req.userId
    const id = req.params.id

    const blog = await Blog.findById(id)

    if (blog.user.toString() === userid.toString()) {
      await Blog.findByIdAndDelete(id)
      res.status(204).end()
    }
  } catch (error) { next(error) }
})

module.exports = blogsRouter
