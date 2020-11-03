const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  category: {
    type: String
  },
  description: {
    type: String
  },
  activities: 
  {
  type: Array,
  ref: "Activity"
  }

});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;