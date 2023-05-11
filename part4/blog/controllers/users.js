const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res, next) => {
  const user = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  if (user.length === 0) res.status(400).json({ error: 'no users yet' })
  else res.status(200).json(user)
})

usersRouter.post('/', async (req, res, next) => {
  const { username, password, name } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, passwordHash, name
  })

  try {
    if (!(username && password)) {
      res.status(400).json({ error: 'username and password are required fields' })
    } else if ((username.length && password.length) < 3) {
      res.status(400).json({ error: 'minimum username and password lenght is 3' })
    } else {
      const savedUser = await user.save()
      res.status(201).json(savedUser)
    }
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter
