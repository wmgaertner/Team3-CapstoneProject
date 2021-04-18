const express = require("express");
const { MongooseDocument } = require("mongoose");
 mongoose = require("mongoose");
 passport = require("passport");
 bodyParser = require("body-parser");
 LocalStrategy = require("passport-local"),
 passportLocalMongoose = require("passport-local-mongoose");
 User = require("./models/user.js"); //user model object 
 UserData = require("./models/userdata.js"); //userdata model object
 timestamps = require('./public/scripts/timestamps.js'); 
 emailverification = require('./public/scripts/emailverification.js');
 flash = require('connect-flash');
 i18n = require('i18n');
 cookieParser = require('cookie-parser');

 
 
 
 
//global variables
var app = express();


mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
// mongoose.connect("mongodb+srv://abc:test123@cluster0.7bifm.mongodb.net/Cluster0?retryWrites=true&w=majority");
mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false");


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
  db.collection("users")
    .findOne({ username: req.user.username })
    .then(function (result) {
      if (!result) {
        throw new Error("Not found");
      }
      console.log("Result: ", result);
      res.render("secret", { data: result });
    });
});

//push data to the database
app.post("/dashboard", isLoggedIn, function (req, res) {
  var date = new Date();
  
  var userid = req.user._id;
  var currentDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  var glucoselevel = req.body.glucoselevel;
  var timestamp = timestamps.maketimestamp(new Date()); 
  var carb = req.body.carbs;

  UserData.findOneAndUpdate(
    {
      '_id': userid,
      'dates.date': {$ne: currentDate}
    },
    {$addToSet: {
      dates: {
        date: currentDate,
      }
    }},
    function(err) {
      console.log(err);
    }
  );

  UserData.findOneAndUpdate(
    {
      '_id': userid,
      'dates.date': currentDate
    },
    {$push: {
    //add data to push to database
      'dates.$.glucosedata': {
        glucoselevels : glucoselevel,
        timestamps : timestamp,
        carbs : carb,
      }
    
    } },
    { 
      new: true,
    },
    function (err,docs){
      if (err) {
        throw new Error("Error finding and updating")
      }
    }
  );

  User.findOneAndUpdate(
    { username: username },
    { $push: { timestamps: timestamp } },
    null,
    function (err, docs) {
      if (err) {
        throw new Error("Error finding and updating")
      }

      
      User.findOne({ username: username })
        .then(function (result) {
          if (!result) {
            throw new Error("Not found");
          }
          console.log("Result: ", result);
          res.render("secret", { data: result });
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
  
  UserData.exists({email: email}).then(answer => {
    if (answer == false){
      
      User.register(
        new User({username: username}),password, 
        function (err, user) {
          if (err) {
            console.log(err);
            res.render("register",{error: err});
          } else {
            passport.authenticate("local")(req, res, function () {
    
              var Data = new UserData({
                _id: req.user._id,
                firstname: firstname,
                lastname: lastname, 
                email: email,  
                dates: [],
                age: age,
                diabetic: diabetic
              })
              Data.save();
              res.render("login");
    
            });
          }
        }
      );
    }

    else{
      res.render("register",{error: "Email is taken."});
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
