const mongoose = require("mongoose");
const { Schema } = mongoose;

const LifeAttrSchema = new Schema({
  name: {
    type: String,
  },

  categoryReference: {
    type: Number,
    ref: "Category",
  },
});

const LifeAttr = mongoose.model("LifeAttr", LifeAttrSchema);

module.exports = LifeAttr;
