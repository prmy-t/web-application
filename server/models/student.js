const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  type: String,
  firstName: String,
  lastName: String,
  enroll: Number,
  branch: String,
  sem: Number,
  date: String,
  gender: String,
  studentContact: Number,
  parentContact: Number,
  email: String,
  password: String,
  image: String,
  result: [],
});

module.exports = mongoose.model("Student", studentSchema);
