const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body
  console.log(username, password)

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(username && passwordCorrect)) {
    return response.status(401).json({ error: "'invalid username or password'" })
  }

  const userToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
