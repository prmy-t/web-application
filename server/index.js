const express = require("express");
const app = express();
const cors = require("cors");

const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const db_url =
  "mongodb+srv://prmy:qwer1234@cluster0-wzjug.mongodb.net/User?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/Users/prmy/Documents/Application/server/temp/",
  })
);

const studentRoutes = require("./routes/studentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const facultyRoutes = require("./routes/facultyRoutes");

app.use(studentRoutes);
app.use(adminRoutes);
app.use(facultyRoutes);

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(3000))
  .catch((err) => {
    console.log(err);
  });
