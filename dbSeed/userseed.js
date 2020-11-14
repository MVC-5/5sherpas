let mongoose = require("mongoose");
let db = require("../models");
const bcrypt = require("bcryptjs");
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

// hash passwords
const hashPass = async (password) => {
  let userPass = await bcrypt.hash(password, 10);
  return userPass;
};

const hashUserPasswords = () => {
  users.forEach(async (user) => {
    let newPass = await hashPass(user.password);
    user.password = newPass;
  });
};

// create dates
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getLastSunday() {
  const t = new Date();
  t.setDate(t.getDate() - t.getDay());
  t.setHours(0, 0, 0, 0);
  return t;
}

const date = getLastSunday();

const date2 = date.addDays(6);

let users = [
  {
    name: "User1",
    email: "user1@gmail.com",
    password: "User1234",
    avatar: 1,
    challengeCategories: [1, 2, 3],

    keywords: [],

    matchingChallenges: [
      "5fa4f0a31471cc2bfbeab5b9",
      "5fa4f0a31471cc2bfbeab5ba",
      "5fa4f0a31471cc2bfbeab5bb",
    ],

    neverDoList: ["5fa4f0a31471cc2bfbeab5bd"],

    currentChallenge: [
      {
        challengeId: "5fa4f0a31471cc2bfbeab5bb",
        completed: false,
      },
      {
        challengeId: "5fa4f0a31471cc2bfbeab5bb",
        completed: true,
      },
      {
        challengeId: "5fa4f0a31471cc2bfbeab5bb",
        completed: false,
      },
    ],

    totalProgress: [
      { dateRange: [date, date2], completed: 2 },
      { dateRange: [date2, date2.addDays(7)], completed: 3 },
    ],
  },
  {
    name: "User2",
    email: "user2@gmail.com",
    password: "User1234",
    avatar: 1,
    challengeCategories: [1, 2, 3],

    keywords: [],

    matchingChallenges: [
      "5fa4f0a31471cc2bfbeab5b9",
      "5fa4f0a31471cc2bfbeab5ba",
      "5fa4f0a31471cc2bfbeab5bb",
    ],

    neverDoList: ["5fa4f0a31471cc2bfbeab5bd"],

    currentChallenge: [
      {
        challengeId: "5fa4f0a31471cc2bfbeab5bb",
        completed: false,
      },
      {
        challengeId: "5fa4f0a31471cc2bfbeab5bb",
        completed: true,
      },
      {
        challengeId: "5fa4f0a31471cc2bfbeab5bb",
        completed: false,
      },
    ],

    totalProgress: [
      { dateRange: [date, date2], completed: 2 },
      { dateRange: [date2, date2.addDays(7)], completed: 3 },
    ],
  },
  {
    name: "User3",
    email: "user3@gmail.com",
    password: "User1234",
    avatar: 1,
    challengeCategories: [1, 2, 3],

    keywords: [],

    matchingChallenges: [
      "5fa4f0a31471cc2bfbeab5b9",
      "5fa4f0a31471cc2bfbeab5ba",
      "5fa4f0a31471cc2bfbeab5bb",
    ],

    neverDoList: ["5fa4f0a31471cc2bfbeab5bd"],

    currentChallenge: [
      {
        challengeId: "5fa4f0a31471cc2bfbeab5bb",
        completed: false,
      },
      {
        challengeId: "5fa4f0a31471cc2bfbeab5bb",
        completed: true,
      },
      {
        challengeId: "5fa4f0a31471cc2bfbeab5bb",
        completed: false,
      },
    ],

    totalProgress: [
      { dateRange: [date, date2], completed: 2 },
      { dateRange: [date2, date2.addDays(7)], completed: 3 },
    ],
  },
];

const init = async () => {
  await hashUserPasswords();
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
};

init();
