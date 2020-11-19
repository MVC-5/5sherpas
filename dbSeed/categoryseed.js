let mongoose = require("mongoose");
let db = require("../models");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/5sherpas",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose connected");
  }
);

let categories = [
  {
    _id: 0,
    name: "None",
  },
  {
    _id: 1,
    name: "Wellness",
  },

  {
    _id: 2,
    name: "Intelligence",
  },

  {
    _id: 3,
    name: "Well-Roundedness",
  },

  {
    _id: 4,
    name: "Organization",
  },

  {
    _id: 5,
    name: "Career",
  },

  {
    _id: 6,
    name: "Bad Habit Cessation",
  },

  {
    _id: 7,
    name: "Interpersonal Relationships",
  },
];

db.Category.deleteMany({})
  .then(() => db.Category.collection.insertMany(categories))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
