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
  User.findOne({ _id: req.params.id })
    .then(employer => {
      EmployerProfile.findOne({ user: req.params.id })
        .then(employerProfile => {
          res.render("guest/users/profiles/show", {
            employerProfile,
            employer
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(error => {
      console.log("cound not find user");
    });
});

module.exports = router;
