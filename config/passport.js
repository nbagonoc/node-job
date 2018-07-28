const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const keys = require("./dbSecretKeys");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = passport => {
  // LOCAL STRATEGY
  // For admin/moderator/moderator use
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //   USERS COLLECTION match email. Only find email where the role value is NOT EQUAL to "applicant"
      User.findOne({ email, role: { $ne: "applicant" } }, (err, user) => {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "No user found" });
        }
        // Match Password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      });
    })
  );

  // GOOGLE STRATEGY
  // For Applicants use only
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          role: "applicant"
        };

        // check for existing user
        User.findOne({
          email: profile.emails[0].value
        }).then(user => {
          if (user) {
            // return user
            done(null, user);
          } else {
            // create user
            new User(newUser).save().then(user => done(null, user));
          }
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then(user => done(null, user));
  });
};
