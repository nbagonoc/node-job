const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const EmployerProfile = require("../../models/EmployerProfile");
const ApplicantProfile = require("../../models/ApplicantProfile");

// change the main layout to user, isntead of the main layout
router.all("/*", (req, res, next) => {
  req.app.locals.layout = "user";
  next();
});

// GET | display the create employer profile
router.get("/employer/profile/build", (req, res) => {
  EmployerProfile.findOne({ user: req.user.id }).then(employerProfile => {
    res.render("user/employers/profiles/build", { employerProfile });
  });
});

// GET | display the create applicant profile
router.get("/applicant/profile/build", (req, res) => {
  ApplicantProfile.findOne({ user: req.user.id }).then(applicantProfile => {
    res.render("user/applicants/profiles/build", { applicantProfile });
  });
});

// GET | display the applicant profile
router.get("/applicant/profile/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(applicant => {
      ApplicantProfile.findOne({ user: req.params.id })
        .then(applicantProfile => {
          res.render("user/applicants/profiles/show", {
            applicantProfile,
            applicant
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(error => {
      res.render("guest/applicants/profiles/show");
    });
});

// POST | process create applicant profile
router.post("/applicant/profile/build", (req, res) => {
  const { address, field, contact, image, about } = req.body;

  // validator
  req.checkBody("address", "Address is required").notEmpty();
  req.checkBody("field", "Field is required").notEmpty();
  req.checkBody("contact", "Contact is required").notEmpty();
  req.checkBody("about", "About is required").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.render("user/applicants/profiles/build", {
      errors,
      address,
      field,
      contact,
      image,
      about
    });
  } else {
    const newApplicantProfile = new ApplicantProfile({
      user: req.user.id,
      address,
      field,
      contact,
      image: "http://via.placeholder.com/250x200",
      about
    });

    newApplicantProfile
      .save()
      .then(applicantProfile => {
        req.flash("success_message", "Successfully saved profile");
        res.redirect(`/users/applicant/profile/${req.user.id}`);
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }
});

// PATCH | process update applicant profile
router.patch("/applicant/profile/build/:id", (req, res) => {
  ApplicantProfile.findOne({ _id: req.params.id }).then(applicantProfile => {
    applicantProfile.address = req.body.address;
    applicantProfile.field = req.body.field;
    applicantProfile.contact = req.body.contact;
    applicantProfile.image = req.body.image;
    applicantProfile.about = req.body.about;

    // validator
    req.checkBody("address", "Address is required").notEmpty();
    req.checkBody("field", "Field is required").notEmpty();
    req.checkBody("about", "About is required").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      res.render("user/applicants/profiles/build", {
        errors,
        address,
        field,
        contact,
        image: "http://via.placeholder.com/250x200",
        about
      });
      // console.log("there is an error");
    } else {
      applicantProfile
        .save()
        .then(applicantProfile => {
          req.flash("success_message", "Successfully saved profile");
          res.redirect("/dashboard");
        })
        .catch(err => {
          console.log(err);
          return;
        });
      // console.log("there is no error");
    }
  });
});

// POST | process create employer profile
router.post("/employer/profile/build", (req, res) => {
  const { address, field, website, image, about } = req.body;

  // validator
  req.checkBody("address", "Address is required").notEmpty();
  req.checkBody("field", "Field is required").notEmpty();
  req.checkBody("about", "About is required").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    res.render("user/employers/profiles/build", {
      errors,
      address,
      field,
      website,
      image,
      about
    });
  } else {
    const newEmployerProfile = new EmployerProfile({
      user: req.user.id,
      address,
      field,
      website,
      image: "http://via.placeholder.com/250x200",
      about
    });

    newEmployerProfile
      .save()
      .then(employerProfile => {
        req.flash("success_message", "Successfully saved profile");
        res.redirect("/dashboard");
      })
      .catch(err => {
        console.log(err);
        return;
      });
  }
});

// PATCH | process update employer profile
router.patch("/employer/profile/build/:id", (req, res) => {
  EmployerProfile.findOne({ user: req.user.id }).then(employerProfile => {
    employerProfile.address = req.body.address;
    employerProfile.field = req.body.field;
    employerProfile.website = req.body.website;
    employerProfile.image = req.body.image;
    employerProfile.about = req.body.about;

    // validator
    req.checkBody("address", "Address is required").notEmpty();
    req.checkBody("field", "Field is required").notEmpty();
    req.checkBody("about", "About is required").notEmpty();

    const errors = req.validationErrors();

    if (errors) {
      res.render("user/employers/profiles/build", {
        errors,
        address,
        field,
        website,
        image: "http://via.placeholder.com/250x200",
        about
      });
    } else {
      employerProfile
        .save()
        .then(employerProfile => {
          req.flash("success_message", "Successfully saved profile");
          res.redirect("/dashboard");
        })
        .catch(err => {
          console.log(err);
          return;
        });
    }
  });
});

module.exports = router;
