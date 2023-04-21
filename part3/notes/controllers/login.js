const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response, next) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(username && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userToken = {
    username: user.username,
    id: user._id
  }
  // sign token with the above user info + secret
  const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: '1h' })
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
