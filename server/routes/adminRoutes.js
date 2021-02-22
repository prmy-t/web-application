const express = require("express");
const controller = require("../controllers/adminController");
const router = express.Router();
const studentController = require("../controllers/studentController");

//GET
router.get("/admin/home/getstudent", controller.getStudent);
router.get("/admin/home/getfaculty", controller.getFaculty);
router.get("/admin/home/getschedulelist", controller.getScheduleList);

//POST
router.post("/admin/login", controller.postLogin);

//Student
router.post("/admin/home/addStudent", controller.postAddStudent);
router.post("/admin/home/getsortedstudent/", controller.postSortedStudent);
router.post("/admin/home/findstudent/", controller.findStudent);
router.post("/admin/home/editstudent/", controller.editStudent);
router.post("/admin/home/deletestudent/", controller.deleteStudent);
router.post(
  "/admin/home/deleteselectedstudent/",
  controller.deleteSelectedStudent
);

//Faculties
router.post("/admin/home/addFaculty", controller.postAddFaculty);
router.post("/admin/home/findfaculty/", controller.findFaculty);
router.post("/admin/home/editfaculty/", controller.editFaculty);
router.post("/admin/home/deletefaculty/", controller.deleteFaculty);
router.post(
  "/admin/home/deleteselectedfaculty/",
  controller.deleteSelectedFaculty
);

//Schedules
router.post("/admin/home/postschedule/", controller.postSchedule);
router.post("/admin/home/scheduledeclare/", controller.postScheduleDeclare);
router.post("/admin/home/findschedule/", controller.postFindSchedule);
router.post("/admin/home/deleteschedule/", controller.postDeleteSchedule);
router.post("/admin/home/addinstruction/", controller.addInstruction);

//Result
router.post("/admin/result/getsheet/", controller.getResultSheet);
router.post("/admin/home/saveresultdata/", controller.saveResultData);
router.post("/admin/result/findschedule/", controller.resultFindSchedule);
router.post(
  "/admin/result/generateresultsheet/",
  controller.generateResultSheet
);
module.exports = router;
