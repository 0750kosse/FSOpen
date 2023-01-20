require("dotenv").config();
const mongoose = require("mongoose");
const user = process.env.USER_NAME;
const password = process.env.PASSWORD;

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const url = `mongodb+srv://${user}:${password}@cluster0.edcrd.mongodb.net/notesApp?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    const note = new Note({
      content: "Next step is CSS",
      date: new Date(),
      important: true,
    });

    return note.save();
  })
  .then(() => {
    console.log("note saved!");
    //closing connection is good practice
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});

console.log(process.env);
