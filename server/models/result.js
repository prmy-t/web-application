const { Object } = require("core-js");
const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  examId: String,
  scheduleId: String,
  subjects: Object,
  sem: Number,
  email: String,
  startTime: [],
  endTime: [],
  dates: [],
  cgpa: Number,
  backLog: Number,
});

module.exports = mongoose.model("Result", resultSchema);
