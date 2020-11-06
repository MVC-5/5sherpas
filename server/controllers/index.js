const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports = {
  loginUser: function (req, res, next) {
    console.log(req.body);
    passport.authenticate("local", function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send("no user");
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.send(`${user.name} is logged in.`);
      });
    })(req, res, next);
  },

  findUser: function (req, res) {
    res.send("Found user from login");
  },
  findUserById: function (req, res) {
    res.send("Found user settings based on user id");
    // db.Book
    //   .findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  createUser: function (req, res) {
    db.User.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User already exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new db.User({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        // put in db error handling
        res.send("User created");
      }
    });
  },
  updateUserSettings: function (req, res) {
    res.send("User settings updated");
    // db.Book
    //   .findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getDashboard: function (req, res) {
    res.send("User dashboard challenges & progress data received");
  },
  getChallenge: function (req, res) {
    res.send("Additional weekly challenge received");
  },
  getMovie: function (req, res) {
    res.send("Movie suggestion received");
  },
  getPhysAct: function (req, res) {
    res.send("Physical health activity suggestion received");
  },
  getMentalAct: function (req, res) {
    res.send("Mental health activity suggestion received");
  },
  updateChallenge: function (req, res) {
    res.send("Challenge updated to completed/not now/never show");
  },
};
