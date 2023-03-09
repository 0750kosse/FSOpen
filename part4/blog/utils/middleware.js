const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(400).send({ error: error.message })
  } if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { unknownEndPoint, errorHandler }
