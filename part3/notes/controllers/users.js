const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
  const user = await User.find().populate('notes', { content: 1, important: 1 })
  // console.log("user>>>>", user)
  response.status(200).json(user)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash
  })

  try {
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (error) { next(error) }
})

module.exports = usersRouter
