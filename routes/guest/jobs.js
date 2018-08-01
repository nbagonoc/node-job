const express = require("express");
const router = express.Router();
const Job = require("../../models/Job");
const EmployerProfile = require("../../models/EmployerProfile");
const Application = require("../../models/Application");

// change the main layout to user, isntead of the main layout
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "guest";
  next();
});

// GET | display jobs
router.get("/", (req, res) => {
  Job.find({})
    .sort({ _id: -1 })
    .limit(10)
    .populate("user")
    .then(jobs => {
      res.render("guest/jobs/index", { jobs });
    });
});

// GET | display job
router.get("/:id", (req, res) => {
  Job.findOne({ _id: req.params.id })
    .populate("user")
    .then(job => {
      EmployerProfile.findOne({ user: job.user._id }).then(employerProfile => {
        Application.findOne({
          job: req.params.id,
          user: (req.user && req.user.id) || null
        }).then(applicant => {
          res.render("guest/jobs/show", { job, employerProfile, applicant });
        });
      });
    });
});

module.exports = router;
