const mongoose = require("mongoose");
const { Schema } = mongoose;

const MatchingSchema = new Schema({
  words: {
    type: Array,
  },

  matchingcategories: {
    type: Array,
  },

  activities: {
    type: Array,
  },
});

const Matching = mongoose.model("Matching", MatchingSchema);

module.exports = Matching;
