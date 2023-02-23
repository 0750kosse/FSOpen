require('dotenv').config()

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const noteSchema = new Schema({
  content: {
    type: String,
    minLength: [5, 'Min content note is 5'],
    required: true
  },
  date: Date,
  important: Boolean
})

// format object returned by mongoose & delete the object required fields
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = model('Note', noteSchema)
