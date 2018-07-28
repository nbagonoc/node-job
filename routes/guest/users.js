const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const EmployerProfile = require("../../models/EmployerProfile");

// change the main layout to user, isntead of the main layout
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "guest";
  next();
});

// GET | display the employer profile
router.get("/employer/profile/:id", (req, res) => {
  EmployerProfile.findOne({ user: req.params.id })
    .populate("user")
    .then(employerProfile => {
      res.render("guest/users/profiles/show", { employerProfile });
    });
});

module.exports = router;
