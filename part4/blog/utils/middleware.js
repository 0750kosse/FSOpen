const jwt = require('jsonwebtoken')

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(400).send({ error: error.message })
  } if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  } if (error.name === 'ValidatorError') {
    res.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired'
    })
  }
}

const userExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''

  if (authorization && authorization.startsWith('Bearer ')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const { id: userId } = decodedToken
  req.userId = userId

  next()
}

module.exports = { unknownEndPoint, errorHandler, userExtractor }
