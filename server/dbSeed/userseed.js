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
    name: "User1",
    email: "user1@gmail.com",
    password: "USER1",
    avatar: 1,
    challengeCategories: {
      choice1: "user1 choice 1",
      choice2: "user1 choice 2",
      choice3: "user1 choice 3"
    },

    keywords: ["user1 keyword 1", "user1 keyword 2", "user1 keyword 3"],

    matchingactivities: ["user1 activity 1", "user1 activity 2", "user1 activity 3"],

    neverdolist: ["user1 never do this"],

    currentchallenge: ["user1 challenge 1", "user1 challenge 2", "user1 challenge 3"],

    totalprogress: ["user1 progress 1", "user1 progress 2", "user1 progress 3"]
  },
  {
    name: "User2",
    email: "user2@gmail.com",
    password: "USER2",
    avatar: 1,
    challengeCategories: {
      choice1: "user2 choice 1",
      choice2: "user2 choice 2",
      choice3: "user2 choice 3"
    },

    keywords: ["user2 keyword 1", "user2 keyword 2", "user2 keyword 3"],

    matchingactivities: ["user2 activity 1", "user2 activity 2", "user2 activity 3"],

    neverdolist: ["user2 never do this"],

    currentchallenge: ["user2 challenge 1", "user2 challenge 2", "user2 challenge 3"],

    totalprogress: ["user2 progress 1", "user2 progress 2", "user2 progress 3"]
  },
  {
    name: "User3",
    email: "user3@gmail.com",
    password: "USER3",
    avatar: 1,
    challengeCategories: {
      choice1: "user3 choice 1",
      choice2: "user3 choice 2",
      choice3: "user3 choice 3"
    },

    keywords: ["user3 keyword 1", "user3 keyword 2", "user3 keyword 3"],

    matchingactivities: ["user3 activity 1", "user3 activity 2", "user3 activity 3"],

    neverdolist: ["user3 never do this"],

    currentchallenge: ["user3 challenge 1", "user3 challenge 2", "user3 challenge 3"],

    totalprogress: ["user3 progress 1", "user3 progress 2", "user3 progress 3"]
  }
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