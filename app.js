const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const upload = require("express-fileupload");

// INIT App
const app = express();

// CONFIG
const db = require("./config/dbSecretKeys").mongoURI;
const secret = require("./config/dbSecretKeys").secretOrKey;
require("./config/passport")(passport);

// DB CONNECT
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("we are connected to the DB");
  })
  .catch(err => console.log(err));

//   MIDDLEWARES
// Express-session
app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false
  })
);
// passport
app.use(passport.initialize());
app.use(passport.session());
// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// express validator
app.use(expressValidator());
// connect flash
app.use(flash());
// Local variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");
  next();
});
// express-file-upload
app.use(upload());
// method-override
app.use(methodOverride("_method"));

// HANDLEBAR HELPERS
const { select, isEqual, formatDate } = require("./helpers/helpers");

// SET TEMPLATING ENGINE
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "guest",
    helpers: { select, isEqual, formatDate }
  })
);
app.set("view engine", "handlebars");

// REQUIRE ROUTES
// const admin = require("./routes/guest/admin");
const guestIndex = require("./routes/guest/index");
const auth = require("./routes/guest/auth");
const guestEmployers = require("./routes/guest/employers");
const userIndex = require("./routes/user/index");
const userJobs = require("./routes/user/jobs");
const guestJobs = require("./routes/guest/jobs");
const userUsers = require("./routes/user/users");

// USE ROUTES
// app.use("/admin", admin);
app.use("/", guestIndex);
app.use("/auth", auth);
app.use("/employer", guestEmployers);
app.use("/", userIndex);
app.use("/jobs", userJobs);
app.use("/jobs", guestJobs);
app.use("/users", userUsers);

// STATIC DIRECTORY
app.use(express.static(path.join(__dirname, "public")));

// SET PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`we are live at ${port}`);
});
