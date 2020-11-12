const validator = require("validator");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const currentChallengeSchema = new Schema(
  {
    challengeId: { type: Schema.Types.ObjectId, ref: "Challenge" },
    completed: { type: Boolean },
  },
  { _id: false }
);

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

  challengeCategories: [
    {
      type: Schema.Types.Number,
      ref: "Category",
    },
  ],

  keywords: {
    type: Array,
  },

  matchingactivities: [
    {
      type: Schema.Types.ObjectId,
      ref: "Challenge",
    },
  ],

  neverdolist: {
    type: Array,
  },

  currentchallenge: [currentChallengeSchema],

  totalprogress: {
    type: Array,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
