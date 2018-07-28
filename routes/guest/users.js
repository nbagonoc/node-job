const express = require("express");
const router = express.Router();
const User = require("../../models/User");

// change the main layout to user, isntead of the main layout
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "guest";
  next();
});

// GET | display the user profile
router.get("/profile/:id", (req, res) => {
  res.render("guest/users/profile/show");
});

module.exports = router;
