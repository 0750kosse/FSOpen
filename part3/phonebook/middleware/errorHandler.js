const errorHandler = (err, req, res, next) => {
  console.log(err.name);
  if (err.name === "CastError")
    return res.status(400).send({ err: "malformated id" });
};

module.exports = errorHandler;
