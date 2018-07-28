const express = require("express");
const router = express.Router();
const passport = require("passport");

// GOOGLE STRATEGY
// GET | google auth login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
// GET | redirect user after google oauth
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/applicant/login" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

module.exports = router;
