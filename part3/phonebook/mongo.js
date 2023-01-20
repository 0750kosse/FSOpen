require("dotenv").config();
const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//destructuring node command line arguments
const [, , , name, number] = process.argv;
const password = process.env.PASSWORD;
const user = process.env.USER_NAME;

if (process.argv.length < 3) {
  console.log("please provide password");
  process.exit(1);
}

const connectionString = `mongodb+srv://${user}:${password}@cluster0.edcrd.mongodb.net/phonebook?retryWrites=true&w=majority`;
//Defining mongoose schema: how the document is going to be structured: properties and types
const phonebookSchema = new Schema({
  name: String,
  number: Number,
});
//Creates an instance of the model based on the above schema, which will be stored in db
const Contact = new model("Contact", phonebookSchema);

const addContact = () => {
  const contact = new Contact({
    name,
    number,
  });

  contact.save().then(() => {
    console.log("contact saved");
    mongoose.connection.close();
  });
};

const findContact = () => {
  const find = Contact.find({}).then((data) => {
    console.log("Phonebook:");
    data.map((item) => console.log(`${item.name} : ${item.number}`));
    mongoose.connection.close();
  });
  console.log(find);
};

//connects to mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => console.log(err));

name && number ? addContact() : findContact();
