const { lchown } = require("fs");
const jwt = require("jsonwebtoken");
const Schedule = require("../models/schedule");
require("dotenv").config({ path: `${__dirname}/.env` });
const Email = require("../models/email");
const Student = require("../models/student");
const Result = require("../models/result");

exports.getHome = (req, res, next) => {
  res.send("access granted √√√");
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Student.findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password == password) {
          const type = user.type;
          // console.log(type);
          const token = jwt.sign({ email, type }, process.env.AUTH_KEY);

          res.send({ user: user, token });
        } else res.send({ flag: true });
      } else res.send({ flag: true });
    })
    .catch(() => {
      console.log("catch block");
    });
};

exports.getStudent = (req, res, next) => {
  const id = req.params.id;

  Student.findById(id)
    .then((student) => {
      res.send(student);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getScheduleList = (req, res, next) => {
  const branch = req.body.branch;
  const sem = req.body.sem;
  const userId = req.body.userId;
  console.log(req.body);
  Schedule.find({ declare: "Declare", students: userId, branch, sem })
    .then((schedule) => {
      res.send(schedule);
    })
    .catch((err) => console.log(err));
};

exports.getAdmitCard = (req, res, next) => {
  const userId = req.body.userId;
  const scheduleId = req.body.scheduleId;
  Student.findById({ _id: userId })
    .then((student) => {
      for (index in student.result) {
        if (student.result[index].scheduleId === scheduleId) {
          const msg = {
            to: student.email,
            subject: "Admit Card ",
            data: {
              fullName: student.firstName + " " + student.lastName,
              sem: student.sem,
              branch: student.branch,
              examId: student.result[index].examId,
              subjects: student.result.subjects,
            },
          };
          const emailData = new Email(msg);
          Email.send(emailData);
          res.send("Email sended");
        }
      }
    })
    .catch((err) => console.log(err));
};

exports.issueId = (req, res, next) => {
  const examId = req.body.examId;
  const userId = req.body.userId;
  const scheduleId = req.body.scheduleId;
  const email = req.body.email;
  Student.find({ examId: examId })
    .then((person) => {
      if (person.length === 0) {
        Student.findByIdAndUpdate(
          { _id: userId },
          {
            examId: examId,
          }
        ).then(() => {
          Schedule.findByIdAndUpdate(
            { _id: scheduleId },
            {
              $push: {
                "generatedStudents.studentId": userId,
                "generatedStudents.examId": examId,
              },
            }
          )
            .then(() => {
              Result.findOneAndUpdate({ email: email }, { examId: examId })
                .then(() => {
                  res.send("done");
                })
                .catch();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else res.send("repeated");
    })
    .catch((err) => console.log(err));
};

exports.checkId = (req, res, next) => {
  const id = req.body.id;
  Student.findById({ _id: id })
    .then((person) => {
      console.log(person);
    })
    .catch((err) => console.log(err));
};
exports.getStudent = (req, res, next) => {
  const id = req.body.userId;
  Student.findById({ _id: id })
    .then((student) => {
      res.send(student);
    })
    .catch((err) => console.log(err));
};
exports.resultScheduleList = (req, res, next) => {
  const sem = req.body.sem;
  const branch = req.body.branch;
  const userId = req.body.userId;
  Schedule.find({ sem, branch, students: userId })
    .then((sch) => {
      res.send(sch);
    })
    .catch((err) => console.log(err));
};
exports.getResult = (req, res, next) => {
  const id = req.body.scheduleId;
  const email = req.body.userEmail;
  console.log(email, id);
  Student.findOne({ email, "result.scheduleId": id })
    .then((student) => {
      console.log(student);
      let results = student.result;
      let fname = student.firstName;
      let lname = student.lastName;
      let branch = student.branch;
      for (let i in results) {
        if (results[i].scheduleId === id) {
          results[i]["branch"] = branch;
          results[i]["fname"] = fname;
          results[i]["lname"] = lname;
          res.send(results[i]);
        }
      }
    })
    .catch((err) => console.log(err));
};

// Middleware
exports.verify = async (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    const verified = await jwt.verify(token, process.env.AUTH_KEY);
    if (verified && verified.type === "student") {
      req.token = token;
      return next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(403);
  }
};
