// const db = require("../models");

module.exports = {
  findUser: function (req, res) {
    res.send("Found user by email from login")
    // db.User
    //   .findOne(req.email)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  findUserById: function (req, res) {
    res.send("Found user settings based on user id")
    // db.User
    //   .findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  createUser: function (req, res) {
    res.send("User Created")
    // db.User
    //   .create(req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  updateUserSettings: function (req, res) {
    res.send("User settings updated")
    // db.User
    //   .findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getDashboard: function (req, res) {
    res.send("User dashboard challenges & progress data received")
    // db.User
    //   .findById(req.params.id)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getChallenge: function (req, res) {
    res.send("Additional weekly challenge received")
    // db.Challenge
    //   .find()
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getMovie: function (req, res) {
    res.send("Movie suggestion received")
    // db.Movie
    //   .find()
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getPhysAct: function (req, res) {
    res.send("Physical health activity suggestion received")
    // db.ShortActivity
    //   .find({ shortactivity: "physical" })
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  getMentalAct: function (req, res) {
    res.send("Mental health activity suggestion received")
    // db.ShortActivity
    //   .find({ shortactivity: "mental" })
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  },
  updateChallenge: function (req, res) {
    res.send("Challenge updated to completed/not now/never show")
    // db.User
    //   .findOneAndUpdate({ _id: req.params.id }, req.body)
    //   .then(dbModel => res.json(dbModel))
    //   .catch(err => res.status(422).json(err));
  }
};
