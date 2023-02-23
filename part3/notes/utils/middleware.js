const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  // console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: ' unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(400).send({ error: error.message })
  } if (error.name === 'ValidationError') {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { requestLogger, errorHandler, unknownEndPoint }
