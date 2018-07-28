const express = require("express");
const router = express.Router();
const passport = require("passport");

// change the main layout to user, isntead of the main layout
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "guest";
  next();
});

// GET | display root/home/index
router.get("/", (req, res) => {
  res.render("guest/index");
});

// GET | display applicant login
router.get("/applicant/login", (req, res) => {
  res.render("guest/index/applicant-login");
});

// GET | display admin/moderator/employer login
router.get("/login", (req, res) => {
  res.render("guest/index/login");
});

// POST | process login for admin/moderator/employer
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // validator
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("password", "Password is required").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.render("guest/index/login", {
      errors,
      email
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next);
  }
});

// GET | logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
