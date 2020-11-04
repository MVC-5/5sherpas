const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String
  },

  email: {
    type: String
  },

  password: {
    type: String
  },

  avatar: {
    type: Number
  },

  keywords: {
    type: Array
  },

  matchingactivities: {

    type: Array,
    ref: "Matching"

  },

  neverdolist: {
    type: Array
  },

  currentchallenge: {
    type: Array,
    ref: "Challenge"
  },

  totalprogress: {
    type: Array,
    ref: "Challenge"
  }
  
});

const User = mongoose.model("User", UserSchema);

module.exports = User;