const mongoose = require("mongoose");
const { Schema } = mongoose;

const ShortActivitySchema = new Schema({
  name: {
    type: String,
  },

  activitytype: {
    type: String,
  },

  link: {
    type: String,
  },
});

const ShortActivity = mongoose.model("ShortActivity", ShortActivitySchema);

module.exports = ShortActivity;
