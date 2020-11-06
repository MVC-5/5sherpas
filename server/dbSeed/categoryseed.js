let mongoose = require("mongoose");
let db = require("./models");

mongoose.connect("mongodb://localhost/5sherpas", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let categories = [
  {
    name: "Wellness",

  },

  {
    name: "Intelligence",

  },

  {
    name: "Well-Roundedness",

  },

  {
    name: "Organization",
 
  },

  {
    name: "Career",

  },

  {
    name: "Bad Habit Cessation",

  },

  {
    name: "Bad Habit Cessation",

  },

  {
    name: "Interpersonal Relationships",
 
  },
  
];

db.Category.deleteMany({})
  .then(() => db.Category.collection.insertMany(categories))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  