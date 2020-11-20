let mongoose = require("mongoose");
let db = require("../models");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/5sherpas", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let yak = [
  {
  quote: "That's Yak-Tastic!"
  },

  {
  quote: "Yakan do it!"
  },
  {
  quote: "You are Yak-tabulous!"
  }
]

db.Yak.deleteMany({})
  .then(() => db.Yak.collection.insertMany(yak))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
