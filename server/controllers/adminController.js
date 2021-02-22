const jwt = require("jsonwebtoken");
require("dotenv").config({ path: `${__dirname}/.env` });
const Student = require("../models/student");
const Faculty = require("../models/faculty");
const Schedule = require("../models/schedule");
const fs = require("fs");
const Email = require("../models/email");
const Result = require("../models/result");
const result = require("../models/result");
const studentEnroll =
  parseInt(new Date().getFullYear().toString().substr(-2)) * 100;

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email == "admin" && password == "12345") {
    const token = jwt.sign({ email }, process.env.AUTH_KEY);
    res.send({ token });
  } else {
    res.send({ flag: true });
  }
};

exports.postAddStudent = async (req, res, next) => {
  const image = req.files.file;
  const user = JSON.parse(req.body.user);

  const tempPath = image.tempFilePath;
  const actualPath =
    "/Users/prmy/Documents/Application/client/static/images/student/";
  await fs.renameSync(tempPath, actualPath + image.name);
  const student = new Student({
    type: "student",
    firstName: user.firstName,
    lastName: user.lastName,
    branch: user.branch,
    sem: user.sem,
    date: user.date,
    gender: user.gender,
    studentContact: user.studentContact,
    parentContact: user.parentContact,
    email: user.email,
    password: user.password,
    image: user.image.name,
  });
  student.save().then(() => {
    res.send("done");
  });
};
exports.postAddFaculty = async (req, res, next) => {
  const image = req.files.file;
  const user = JSON.parse(req.body.user);

  const tempPath = image.tempFilePath;
  const actualPath =
    "/Users/prmy/Documents/Application/client/static/images/faculty/";
  await fs.renameSync(tempPath, actualPath + image.name);

  const faculty = new Faculty({
    type: "faculty",
    firstName: user.firstName,
    lastName: user.lastName,
    subject: user.subject,
    gender: user.gender,
    contact: user.contact,
    email: user.email,
    password: user.password,
    image: user.image.name,
  });
  faculty
    .save()
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postSortedStudent = (req, res, next) => {
  const sem = req.body.sem;
  const branch = req.body.branch;

  Student.find({ sem: sem, branch: branch })
    .then((student) => {
      res.send(student);
    })
    .catch();
};

exports.getStudent = (req, res, next) => {
  Student.find()
    .then((student) => {
      res.send(student);
    })
    .catch();
};

exports.getFaculty = (req, res, next) => {
  Faculty.find()
    .then((faculty) => {
      res.send(faculty);
    })
    .catch((err) => console.log(err));
};
exports.findStudent = (req, res, next) => {
  const email = req.body.email;
  Student.findOne({ email: email })
    .then((student) => {
      res.send(student);
    })
    .catch((err) => console.log(err));
};

exports.findFaculty = (req, res, next) => {
  const email = req.body.email;
  Faculty.findOne({ email: email })
    .then((faculty) => {
      res.send(faculty);
    })
    .catch((err) => console.log(err));
};

exports.deleteStudent = (req, res, next) => {
  const email = req.body.email;
  Student.deleteOne({ email: email })
    .then(() => {
      Result.deleteOne({ email: email })
        .then(() => {
          res.status(200).send("success");
        })
        .catch();
    })
    .catch((err) => console.log(err));
};
exports.deleteSelectedStudent = (req, res, next) => {
  const selected = req.body.selected;
  // console.log(selected);
  for (index in selected) {
    const email = selected[index].email;

    Student.deleteOne({ email: email })
      .then(() => {
        Result.deleteOne({ email: email })
          .then(() => {
            res.status(200).send("success");
          })
          .catch();
      })
      .catch((err) => console.log(err));
  }
};

exports.deleteFaculty = (req, res, next) => {
  const email = req.body.email;
  Faculty.deleteOne({ email: email })
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => console.log(err));
};
exports.deleteSelectedFaculty = (req, res, next) => {
  const selected = req.body.selected;
  for (index in selected) {
    const email = selected[index].email;

    Faculty.deleteOne({ email: email })
      .then(() => {
        res.status(200).send("success");
      })
      .catch((err) => console.log(err));
  }
};

exports.editStudent = async (req, res, next) => {
  const image = req.files.file;
  const user = JSON.parse(req.body.editUser);
  const tempPath = image.tempFilePath;
  const actualPath =
    "/Users/prmy/Documents/Application/client/static/images/faculty/";
  await fs.renameSync(tempPath, actualPath + image.name);
  const id = user.id;
  Student.findOneAndUpdate(
    { _id: id },
    {
      firstName: user.firstName,
      lastName: user.lastName,
      branch: user.branch,
      sem: user.sem,
      date: user.date,
      gender: user.gender,
      studentContact: user.studentContact,
      parentContact: user.parentContact,
      email: user.email,
      password: user.password,
      image: user.image,
    }
  )
    .then(() => {
      Result.findOneAndUpdate(
        { email: user.email },
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          branch: user.branch,
          currentSem: user.sem,
        }
      )
        .then(() => {
          res.status(200).send("success");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
exports.editFaculty = async (req, res, next) => {
  const image = req.files.file;
  const user = JSON.parse(req.body.editUser);

  const tempPath = image.tempFilePath;
  const actualPath =
    "/Users/prmy/Documents/Application/client/static/images/faculty/";
  await fs.renameSync(tempPath, actualPath + image.name);
  const id = user.id;
  Faculty.findOneAndUpdate(
    { _id: id },
    {
      firstName: user.firstName,
      lastName: user.lastName,
      subject: user.subject,
      gender: user.gender,
      contact: user.contact,
      email: user.email,
      password: user.password,
      image: user.image,
    }
  )
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => console.log(err));
};

// SCHEDULE_CONTROLLERS

exports.getScheduleList = (req, res, next) => {
  Schedule.find()
    .then((schedule) => {
      res.send(schedule);
    })
    .catch((err) => console.log(err));
};

exports.postSchedule = (req, res, next) => {
  const scheduleData = JSON.parse(req.body.scheduleData);
  const roomWiseId = scheduleData.roomArray;
  const students = scheduleData.selectedStudents;

  const schedule = new Schedule({
    title: scheduleData.title,
    sem: scheduleData.sem,
    branch: scheduleData.branch,
    dates: scheduleData.dates,
    subjects: scheduleData.subjects,
    startTime: scheduleData.startTime,
    endTime: scheduleData.endTime,
    students: scheduleData.selectedStudents,
    faculties: scheduleData.selectedFaculties,
    rooms: scheduleData.rooms,
    roomWiseId: scheduleData.roomArray,
    generatedStudents: { studentId: [], examId: [] },
    roomWidth: scheduleData.roomWidth,
    roomHeight: scheduleData.roomHeight,
    instruction: "",
    declare: "Undeclare",
  });
  schedule
    .save()
    .then((schedule) => {
      idGenerator(
        roomWiseId,
        students,
        schedule._id,
        schedule.title,
        schedule.sem,
        schedule.subjects,
        schedule.dates,
        schedule.startTime,
        schedule.endTime
      );
      // idSwapper(schedule._id, scheduleData.selectedStudents);
      res.status(200).send("success");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postScheduleDeclare = (req, res, next) => {
  const id = req.body.id;
  const declare = req.body.declare;

  Schedule.findOneAndUpdate({ _id: id }, { declare: declare })
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => console.log(err));
};

exports.postFindSchedule = (req, res, next) => {
  const id = req.body.id;
  Schedule.findById(id)
    .then((schedule) => {
      res.send(schedule);
    })
    .catch((err) => console.log(err));
};
exports.postDeleteSchedule = (req, res, next) => {
  const id = req.body.id;
  Schedule.deleteOne({ _id: id })
    .then(() => {
      console.log("into then");
      Student.updateMany(
        {},
        {
          $pull: {
            result: { scheduleId: id },
          },
        }
      )
        .then(() => {
          res.send("done");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.addInstruction = (req, res, next) => {
  const id = req.body.id;
  const inst = req.body.inst;

  Schedule.findOneAndUpdate(
    { _id: id },
    {
      instruction: inst,
    }
  )
    .then(() => {
      res.status(200).send("success");
    })
    .catch((err) => console.log(err));
};

//Result Controller

exports.getResultSheet = (req, res, next) => {
  const branch = req.body.branch;
  Result.find({ branch })
    .then((students) => {
      let student = students[0];
      Schedule.findById({ _id: student.scheduleId })
        .then((schedule) => {
          let rooms = schedule.rooms;
          let capacity = schedule.roomWidth * schedule.roomHeight;

          res.send({ students, rooms, capacity });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.saveResultData = (req, res, next) => {
  const resultData = req.body.resultData;
  const id = req.body.id;
  console.log(resultData[0]["cgpa"], resultData[0]["backLog"]);
  for (i in resultData) {
    let email = resultData[i].email;

    Student.findOneAndUpdate(
      { "result.scheduleId": id, email },
      {
        "result.$.subjects": resultData[i]["subjects"],
        "result.$.cgpa": resultData[i]["cgpa"],
        "result.$.backLog": resultData[i]["backLog"],
      }
    )

      .then((match) => {
        console.log(match);
      })
      .catch((err) => console.log(err));
  }
  res.send("done");
};

exports.resultFindSchedule = (req, res, next) => {
  const branch = req.body.branch;
  const sem = req.body.sem;
  Schedule.find({ branch, sem })
    .then((schedules) => {
      res.send(schedules);
    })
    .catch((err) => console.log(err));
};

exports.generateResultSheet = (req, res, next) => {
  const id = req.body.id;
  Schedule.findById(id)
    .then((schedule) => {
      const room = schedule.rooms;
      const capacity = schedule.roomWidth * schedule.roomHeight;
      Student.find({
        "result.scheduleId": id,
      })
        .then((replay) => {
          let students = [];
          for (let s in replay) {
            let st = replay[s];
            for (let r in st.result) {
              if (st.result[r].scheduleId === id) {
                const obj = {
                  firstName: replay[s].firstName,
                  lastName: replay[s].lastName,
                  subjects: st.result[r].subjects,
                  examId: st.result[r].examId,
                  email: st.result[r].email,
                  cgpa: st.result[r].cgpa,
                  backLog: st.result[r].backLog,
                };
                students.push(obj);
              }
            }
          }

          res.send({ students, room, capacity });
        })
        .catch((err) => console.log(err));
    })
    .catch();
};

//FUNCTIONS__
function idSwapper(scheduleId, studentArray) {
  for (let i = 0; i < studentArray.length; i++) {
    Student.findByIdAndUpdate({ _id: studentArray[i]._id }, {})
      .then(() => {
        Result.findOneAndUpdate(
          { email: studentArray[i].email },
          {
            $push: {
              scheduleId: scheduleId,
            },
          }
        )
          .then()
          .catch();
      })
      .catch();
  }
}

function idGenerator(
  idArray,
  students,
  scheduleId,
  scheduleTitle,
  sem,
  subjects,
  dates,
  startTime,
  endTime
) {
  let wholeArray = [];
  for (let room in idArray) {
    for (let w in idArray[room]) {
      for (let h in idArray[room][w]) {
        if (idArray[room][w][h]) wholeArray.push(idArray[room][w][h]);
      }
    }
  }
  wholeArray = shuffle(wholeArray);
  let sub = {};
  for (let i in subjects) {
    sub[subjects[i]] = null;
  }
  console.log("sub: " + sub);
  for (let person in students) {
    const result = new Result({
      examId: wholeArray[person],
      scheduleId: scheduleId,
      sem: sem,
      email: students[person].email,
      subjects: sub,
      cgpa: null,
      backLog: null,
      startTime: startTime,
      endTime: endTime,
      dates: dates,
    });
    result
      .save()
      .then((result) => {
        Student.findByIdAndUpdate(
          { _id: students[person]._id },
          {
            $push: {
              result: result,
            },
          }
        )
          .then()
          .catch((err) => console.log(err));
      })
      .catch();
  }
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
