const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  title: String,
  sem: Number,
  branch: String,
  dates: [String],
  subjects: [String],
  startTime: [String],
  endTime: [String],
  students: [String],
  faculties: [String],
  rooms: Number,
  roomWiseId: [],
  singleStrength: Number,
  roomWidth: Number,
  roomHeight: Number,
  instruction: String,
  declare: String,
});

module.exports = mongoose.model("Schedule", scheduleSchema);
