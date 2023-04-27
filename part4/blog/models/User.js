const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
    minLength: 3
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blogs'
  }]
})

const User = mongoose.model('User', userSchema)
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = User
