const mongoose = require("mongoose");

const facultySchema = mongoose.Schema({
  type: String,
  firstName: String,
  lastName: String,
  subject: String,
  gender: String,
  contact: Number,
  email: String,
  password: String,
  image: String,
});

module.exports = mongoose.model("Faculty", facultySchema);
