let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect(
  "mongodb://localhost/5sherpas",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose connected");
  }
);

let users = [
  {
    name: "Karen",
    email: "speakto@manager.com",
    password: "vaccinesarebad"
  },

  {
    name: "Kyle",
    email: "motocross@bro.com",
    password: "monsterenergy"
  },


];

db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(users))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
