const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({

  _id: {
    type: Number
  },
  name: {
    type: String,
    unique: true
  },

});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;

