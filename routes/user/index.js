const express = require("express");
const router = express.Router();

// change the main layout to user, isntead of the main layout
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "user";
  next();
});

// GET | display root/home/index
router.get("/dashboard", (req, res) => {
  res.render("user/index/dashboard");
});

module.exports = router;
