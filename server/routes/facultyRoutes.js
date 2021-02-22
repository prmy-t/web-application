const express = require("express");
const controller = require("../controllers/facultyController");
const router = express.Router();

//GET
router.get("/login", controller.getHome);
router.get("/faculty/home/:id", controller.getFaculty);
router.post(
  "/faculty/home/getschedulelist/",

  controller.getScheduleList
);

//POST
router.post("/faculty/login", controller.postLogin);
module.exports = router;
