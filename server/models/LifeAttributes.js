const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LifeAttrSchema = new Schema({
  name: {
    type: String
  },

  categoryreference: {
    ref: "Category"
  }

});

const LifeAttr = mongoose.model("LifeAttr", LifeAttrSchema);

module.exports = LifeAttr;