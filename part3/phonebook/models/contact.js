const mongoose = require("mongoose");

const { Schema, model } = mongoose;
const url = process.env.MONGODB_URI;

mongoose.connect(url);

const phonebookSchema = new Schema({
  name: {
    type: String,
    minlength: [5, "min lenght should be 5"],
    required: true,
  },
  number: {
    type: String,
    minLength: [6, "min lenght should be 6, got {VALUE}"],
    //maxLength: [8, "max lenght should be 8, got {VALUE}"],
    required: [true, "phone number required"],
    validate: {
      validator: function (v) {
        return /\d{2,3}-\d{7,8}/.test(v);
      },
    },
  },
});

const Contact = model("Contact", phonebookSchema);

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = Contact;
