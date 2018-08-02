const express = require("express");
const router = express.Router();
const Job = require("../../models/Job");
const Application = require("../../models/Application");

// change the main layout to user, isntead of the main layout
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "guest";
  next();
});

// POST | submit an application to job post
router.post("/apply/:id", (req, res) => {
  Job.findOne({ _id: req.params.id }).then(job => {
    const newApplication = new Application({
      job: req.params.id,
      user: req.user.id,
      body: req.body.body
    });
    job.applicants.push(newApplication);
    job.save().then(saveJob => {
      newApplication.save().then(savedApplication => {
        req.flash(
          "success_message",
          "You have successfully applied to this job post."
        );
        res.redirect(`/jobs/${job.id}`);
      });
    });
  });
});

module.exports = router;
