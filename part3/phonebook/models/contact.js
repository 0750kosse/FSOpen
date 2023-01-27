const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const url = process.env.MONGODB_URI;

mongoose.connect(url);

const phonebookSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: String,
});

const Contact = model("Contact", phonebookSchema);

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Contact", phonebookSchema);
