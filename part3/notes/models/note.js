require("dotenv").config();

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("db connected");
  })
  .catch((err) => console.log("error connecting to db", err.message));

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
});

//format object returned by mongoose & delete the object required fields
noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model("Note", noteSchema);
