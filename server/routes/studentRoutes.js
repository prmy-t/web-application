const express = require("express");
const controller = require("../controllers/studentController");
const router = express.Router();
// const student = require("../controllers/studentController");

//GET
router.get("/login", controller.getHome);

//POST
router.post(
  "/student/home/getschedulelist/",
  controller.verify,
  controller.getScheduleList
);
router.post("/student/login", controller.postLogin);
router.post("/student/issueid", controller.issueId);
router.post("/student/checkid", controller.checkId);
router.post("/student/getadmitcard", controller.getAdmitCard);
router.post("/student/getstudent", controller.getStudent);
router.post("/student/result/getschedulelist", controller.resultScheduleList);
router.post("/student/result/getresult", controller.getResult);
module.exports = router;
