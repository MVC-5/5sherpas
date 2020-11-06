const validator = require("validator");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: "First name required",
  },

  email: {
    type: String,
    required: "Email required",
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email",
    },
  },

  password: {
    type: String,
    required: "Password required",
  },

  avatar: {
    type: Number,
  },

  keywords: {
    type: Array,
  },

  matchingactivities: {
    type: Array,
    ref: "Matching",
  },

  neverdolist: {
    type: Array,
  },

  currentchallenge: {
    type: Array,
    ref: "Challenge",
  },

  totalprogress: {
    type: Array,
    ref: "Challenge",
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
