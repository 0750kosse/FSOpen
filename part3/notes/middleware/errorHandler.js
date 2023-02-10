const errorHandler =(error, req, res, next) => {
console.log(error)
if(error.name === "CastError") {
  res.status(400).send({ error: error.message });
} if(error.name === "ValidationError") {
  res.status(400).json({error:error.message})
}
}

module.exports = errorHandler