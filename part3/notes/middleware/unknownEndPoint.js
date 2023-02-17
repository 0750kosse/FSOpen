const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: ' unknown endpoint' })
}

module.exports = unknownEndPoint
