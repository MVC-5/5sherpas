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

let movies = [

  {

    title: "Happy Gilmore",
    genre: "Comedy",
    ismovie: true

  },

  {

    title: "Starship Troopers",
    genre: "Science Fiction",
    ismovie: true

  },
  
  {

    title: "The Birds",
    genre: "Horror",
    ismovie: true

  },

  {

    title: "Die Hard",
    genre: "Action",
    ismovie: true

  },

  {

    title: "The Goonies",
    genre: "Adventure",
    ismovie: true

  },

  {

    title: "Meru",
    genre: "Documentary",
    ismovie: true

  },

  {

    title: "Despicable Me",
    genre: "Family",
    ismovie: true

  },

];

db.Movie.deleteMany({})
  .then(() => db.Movie.collection.insertMany(movies))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });