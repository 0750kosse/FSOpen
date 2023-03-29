const logger = require('../utils/logger')
const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery', false)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('DB connected')
  })
  .catch((err) => logger.error('error connecting to db >>', err.message))

module.exports = Blog
