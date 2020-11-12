const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../models");
const challengeController = require("./challengecontroller");

module.exports = {
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

  findUser: function (req, res) {
    res.send("Found user by email from login");
    // db.User
    //   .findOne(req.email)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  findUserById: function (req, res) {
    db.User.find({ _id: req.params.id })
      .populate("challengeCategories")
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
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
  updateUserChallengeCategories: function (req, res) {
    const updateId = req.body.id;
    const categoryArr = [req.body.choice1, req.body.choice2, req.body.choice3];
    db.User.findByIdAndUpdate(
      updateId,
      { $set: { challengeCategories: categoryArr } },
      { new: true, useFindAndModify: false }
    )
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  getDashboard: function (req, res) {
    challengeController.getChallenges(req, res);
  },
  getChallenge: function (req, res) {
    db.Challenge.find()
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  getMovie: function (req, res) {
    res.send("Movie suggestion received");
    // db.Movie
    //   .find()
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getPhysAct: function (req, res) {
    db.ShortActivity.find({ activityType: "Physical" })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  getMentalAct: function (req, res) {
    db.ShortActivity.find({ activityType: "Mental" })
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  updateChallenge: function (req, res) {
    res.send("Challenge updated to completed/not now/never show");
    // db.User
    //   .findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
};
