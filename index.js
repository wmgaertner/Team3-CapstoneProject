const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");
User = require("./models/user.js");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
// mongoose.connect("mongodb+srv://abc:test123@cluster0.7bifm.mongodb.net/Cluster0?retryWrites=true&w=majority");
mongoose.connect("mongodb://localhost:27017/");

//! Change this to utilize local passport
const db = mongoose.connection;

var app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static("node_modules"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  require("express-session")({
    secret: "session secret code",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("*", function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
  res.render("home");
});

// Showing secret page
app.get("/secret", isLoggedIn, function (req, res) {
  res.render("secret");
});

//glocuselevel update to database
app.post("/secret", isLoggedIn, function (req, res) {
  var glocuselevel = req.body.glucoselevel;
  var username = req.user.username;
  User.findOneAndUpdate(
    { username: username },
    { $push: { glucoselevels: glocuselevel } },
    null,
    function (err, docs) {
      if (err) {
        throw new Error("Error finding and updating")
      }

      //! Change this to utilize passport
      db.collection("users")
        .findOne({ username: username })
        .then(function (result) {
          if (!result) {
            throw new Error("Not found");
          }
          console.log("Result: ", result);
          res.render("secret", { glucose: result });
        });
    }
  );
});

// Showing register form
app.get("/register", function (req, res) {
  res.render("register");
});

// Handling user signup
app.post("/register", function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  User.register(
    new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      glucoselevel: [0],
      username: username,
    }),
    password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.render("secret");
        });
      }
    }
  );
});

//Showing login form
app.get("/login", function (req, res) {
  res.render("login");
});

//Handling user login
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login",
  }),
  function (req, res) {}
);

//Handling user logout
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});
