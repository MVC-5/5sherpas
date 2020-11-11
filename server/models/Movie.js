const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String
  },

  genre: {
    type: String

  },

  ismovie: {
    type: Boolean

  }

});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
