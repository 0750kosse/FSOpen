const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

mongoose
  .connect(config.NODE_ENV === 'test' ? config.MONGODB_URI_TEST : config.MONGODB_URI)
  .then(() => {
    logger.info('DB connected')
  })
  .catch((err) => logger.error('error connection to db', err.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app
