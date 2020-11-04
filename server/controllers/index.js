// const db = require("../models");

module.exports = {
  findUser: function (req, res) {
    res.send("Found user from login")
    // db.Book
    //   .findOne(req.query)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  findUserById: function (req, res) {
    res.send("Found user settings based on user id")
    // db.Book
    //   .findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  createUser: function (req, res) {
    res.send("User Created")
    // db.Book
    //   .create(req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  updateUserSettings: function (req, res) {
    res.send("User settings updated")
    // db.Book
    //   .findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getDashboard: function (req, res) {
    res.send("User dashboard challenges & progress data received")
  },
  getChallenge: function (req, res) {
    res.send("Additional weekly challenge received")
  },
  getMovie: function (req, res) {
    res.send("Movie suggestion received")
  },
  getPhysAct: function (req, res) {
    res.send("Physical health activity suggestion received")
  },
  getMentalAct: function (req, res) {
    res.send("Mental health activity suggestion received")
  },
  updateChallenge: function (req, res) {
    res.send("Challenge updated to completed/not now/never show")
  }
};
