const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
  name: {
    type: String
  },

  description: {
    type: String
  },

  links: {
    type: Array
  },
  
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);

module.exports = Challenge;

//Add comment to trigger GitHub change