const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema({
  title: {
    type: String,
  },

  genre: {
    type: String,
  },

  isMovie: {
    type: Boolean,
  },
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
