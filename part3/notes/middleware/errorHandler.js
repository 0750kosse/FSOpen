const errorHandler =(error, req, res, next) => {
console.log(error)
if(error.name === "CastError") {
  res.status(400).send({ error: "malformated id" });
}
}

module.exports = errorHandler