const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChallengeSchema = new Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },

  links: {
    type: Array,
  },

  categoryreference: {
    type: Number,
    ref: "Category",
  },
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;