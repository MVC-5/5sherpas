const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShortActivitySchema = new Schema({
  name: {
    type: String
  },

  shortactivity: {
    type: String
  },

});

const ShortActivity = mongoose.model("ShortActivity", ShortActivitySchema);

module.exports = ShortActivity;