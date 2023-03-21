
const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

mongoose
// connect to test or production DB
  .connect(config.NODE_ENV === 'test' ? config.MONGODB_URI_TEST : config.MONGODB_URI)
  .then(() => {
    logger.info('db connected')
  })
  .catch((err) => logger.error('error connecting to db', err.message))

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app
