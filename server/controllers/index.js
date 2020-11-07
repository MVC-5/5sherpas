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
      res.send("Found user by email from login");
    // db.User
    //   .findOne(req.email)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  findUserById: function (req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
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
          .then((result) => {
            res.send("User created");
            console.log(result);
          })
          .catch((error) => {
            throw error;
          });
      }
    });
  },
  updateUserSettings: function (req, res) {
    console.log(req.params)
    db.User
      .findOneAndUpdate({ _id: req.params.id }, 
        {$push: {keywords: req.body.keywords},
       },
       {$push: {matchingactivities: req.body.matchingactivities},
       },
       {$push: {neverdolist: req.body.neverdolist},
       },
       {$push: {currentchallenge: req.body.currentchallenge},
       },
       {$push: {totalprogress: req.body.totalprogress},
       },
       {name: req.body.name},
       {email: req.body.email},
       {password: req.body.password}
       )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getDashboard: function (req, res) {
    res.send("User dashboard challenges & progress data received")
    // db.User
    //   .findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getChallenge: function (req, res) {
    db.Challenge
      .find()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getMovie: function (req, res) {
    res.send("Movie suggestion received")
    // db.Movie
    //   .find()
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getPhysAct: function (req, res) {
    db.ShortActivity
      .find({ activityType: "Physical" })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  getMentalAct: function (req, res) {
    db.ShortActivity
      .find({ activityType: "Mental" })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateChallenge: function (req, res) {
    res.send("Challenge updated to completed/not now/never show")
    // db.User
    //   .findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  }
};
