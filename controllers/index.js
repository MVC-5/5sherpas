const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../models");
const challCont = require("./challengecontroller");

module.exports = {
  // logs in user
  loginUser: function (req, res, next) {
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

  // gets yak quotes
  yakIt: function (req, res) {
    db.Yak.find()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // logs out user
  logoutUser: function (req, res) {
    req.logOut();
    res.send(`${req.body.name} is logged out`);
  },

  // gets user document based on id
  findUserById: function (req, res) {
    db.User.find({ _id: req.params.id })
      .populate("challengeCategories")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // creates user if they don't already exist
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
        await newUser
          .save()
          .then(() => {
            res.send("User created");
          })
          .catch((error) => {
            throw error;
          });
      }
    });
  },

  // updates name or email for specific user
  updateUserSettings: function (req, res) {
    const updateId = req.params.id;
    const field = req.body.field;
    const value = req.body.value;
    db.User.findOneAndUpdate(
      { _id: updateId },
      { $set: { [field]: value } },
      { useFindAndModify: false }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // updates user-selected challenge categories
  updateUserChallengeCategories: function (req, res) {
    const updateId = req.body.id;
    console.log(updateId);
    const categoryArr = [req.body.choice1, req.body.choice2, req.body.choice3];
    // update user with new categories
    db.User.findByIdAndUpdate(
      updateId,
      { $set: { challengeCategories: categoryArr } },
      { new: true, useFindAndModify: false }
    )
      .then((result) => {
        console.log(result, "index controller line 96");
        // continue API call by getting new matching and challenges
        challCont.getNewMatching(req, res, categoryArr);
      })
      .catch((err) => res.status(422).json(err));
  },

  // upon validation, updates user password
  updatePass: function (req, res, next) {
    passport.authenticate("local", async function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send("Failed");
      }
      if (user) {
        const newHashed = await bcrypt.hash(req.body.new, 10);
        user.password = newHashed;
        await user.save();
        return res.send("Success");
      }
    })(req, res, next);
  },

  // gets dashboard user data
  getDashboard: function (req, res) {
    challCont.getChallenges(req, res);
  },

  // gets challenges to display in dashboard
  getChallenge: function (req, res) {
    db.Challenge.find()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // gets movies based on user genre selection
  getMovie: function (req, res) {
    let movieChoices = [];
    let selectedCat = req.params.cat.toString();
    db.Movie.find({ genre: selectedCat }).exec(function (err, result) {
      if (err) {
        console.log(err, err.stack);
      }
      if (result) {
        for (var i = 0; i < result.length; i++) {
          movieChoices.push({
            title: result[i].title,
          });
        }
        res.json(movieChoices);
      }
    });
  },

  // gets physical activity suggestion
  getPhysAct: function (req, res) {
    db.ShortActivity.find({ activityType: "Physical" })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // gets mental health activity suggestion
  getMentalAct: function (req, res) {
    db.ShortActivity.find({ activityType: "Mental" })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },

  // updates challenge status based on user selection in dashboard
  updateChallenge: function (req, res) {
    const request = req.body;
    console.log(request.action);
    switch (request.action) {
      case "complete":
        return challCont.completeChallenge(req, res);
      case "swap":
        return challCont.swapChallenge(req, res);
      case "never":
        return challCont.neverDoChallenge(req, res);
      default:
        console.error(request.action + " is not a valid option.");
        break;
    }
    res.send(request.action + " is not a valid option.");
  },
};
