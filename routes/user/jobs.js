const express = require("express");
const router = express.Router();
const Job = require("../../models/Job");

// change the main layout to user, isntead of the main layout
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "user";
  next();
});

// GET | display jobs
router.get("/employer", (req, res) => {
  Job.find({ user: req.user.id })
    .sort({ _id: -1 })
    .then(jobs => {
      res.render("user/jobs/index", { jobs });
    });
});

// GET | display create a job
router.get("/employer/create", (req, res) => {
  res.render("user/jobs/create");
});

// POST | process create a job
router.post("/employer/create", (req, res) => {
  const { title, salary, category, type, location, description } = req.body;

  // validator
  req.checkBody("title", "Job title is required").notEmpty();
  req.checkBody("salary", "Salary range is required").notEmpty();
  req.checkBody("category", "category is required").notEmpty();
  req.checkBody("type", "Employment type is required").notEmpty();
  req.checkBody("location", "Location is required").notEmpty();
  req.checkBody("description", "Description is required").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.render("user/jobs/create", {
      errors,
      title,
      salary,
      category,
      type,
      location,
      description
    });
  } else {
    const newJob = new Job({
      user: req.user.id,
      title,
      salary,
      category,
      type,
      location,
      description
    });

    newJob
      .save()
      .then(job => {
        req.flash("success_message", "Successfully created a job posting");
        res.redirect("/jobs/employer");
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }
});

module.exports = router;
