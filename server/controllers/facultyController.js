const jwt = require("jsonwebtoken");
require("dotenv").config({ path: `${__dirname}/.env` });
const Schedule = require("../models/schedule");
const Faculty = require("../models/faculty");
const Result = require("../models/result");

exports.getHome = (req, res, next) => {
  res.send("access granted √√√");
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Faculty.findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (user) {
        console.log(password);
        if (user.password == password) {
          console.log("true");
          const token = jwt.sign({ email }, process.env.AUTH_KEY);

          res.send({ user: user, token });
        } else res.send({ flag: true });
      } else res.send({ flag: true });
    })
    .catch(() => {
      console.log("catch block");
    });
};

exports.getFaculty = (req, res, next) => {
  const id = req.params.id;

  Student.findById(id)
    .then((faculty) => {
      //console.log(user);
      res.send({ faculty: faculty });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getScheduleList = (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  Schedule.find({ declare: "Declare" })
    .then((schedules) => {
      // console.log(schedules);
      let sch = [];
      for (let i = 0; i < schedules.length; i++) {
        if (schedules[i].faculties.includes("6002691f03d4ce25797d9c78")) {
          sch.push(schedules[i]);
          console.log("pushed");
        }
      }
      res.send(sch);
    })
    .catch((err) => console.log(err));
};

// Middleware
exports.verify = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    // req.token = token;
    const verified = jwt.verify(token, process.env.AUTH_KEY);
    if (verified) {
      return next();
    } else {
      res.sendStatus(403);
    }
  } else {
    //If header is undefined return Forbidden (403)
    res.sendStatus(403);
  }
};
