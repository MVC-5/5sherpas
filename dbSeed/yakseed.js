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
  quote: "Yakkity yak, please come back!"
  },
  {
  quote: "That's a fact, Yak!"
  },
  {
  quote: "Pack your yak and stay on track!"
  },
  {
  quote: "I'm your Yak, I got your back!"
  },
  {
  quote: "Y.A.K. (Your Animal Kinfolk)"
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
