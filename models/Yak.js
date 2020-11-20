const mongoose = require("mongoose");
const { Schema } = mongoose;

const YakSchema = new Schema({
  quote: {
    type: String,
  },

});

const Yak = mongoose.model("Yak", YakSchema);

module.exports = Yak;
