const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

// change the main layout to user, isntead of the main layout
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "guest";
  next();
});

// GET | display employer page
router.get("/", (req, res) => {
  res.render("guest/index/employer");
});

// GET | display employer register
router.get("/register", (req, res) => {
  res.render("guest/index/employer-register");
});

// POST | process employer register
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  // validator
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "Email is required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("password", "Password is required").notEmpty();
  req.checkBody("password2", "Password did not match").equals(password);

  const errors = req.validationErrors();

  if (errors) {
    res.render("guest/index/employer-register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        req.flash("error_message", "Email already exist");
        res.render("guest/index/employer-register", {
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          role: "employer",
          credit: 10
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  "success_message",
                  "You are now registered, and can now login"
                );
                res.redirect("/login");
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });
      }
    });
  }
});

module.exports = router;
