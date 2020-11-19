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

let movies = [
  {
    title: "Happy Gilmore",
    genre: "Comedy",
    ismovie: true,
  },

  {
    title: "Starship Troopers",
    genre: "Science Fiction",
    ismovie: true,
  },

  {
    title: "The Birds",
    genre: "Horror",
    ismovie: true,
  },

  {
    title: "Die Hard",
    genre: "Action",
    ismovie: true,
  },

  {
    title: "The Goonies",
    genre: "Adventure",
    ismovie: true,
  },

  {
    title: "Despicable Me",
    genre: "Family",
    ismovie: true,
  },

  {
    title: "Meru",
    genre: "Documentary",
    ismovie: true,
  },
  {
    title: "Tommy Boy",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Big Daddy",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Black Sheep",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Hurt Locker",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "Nightmare on Elm Streen",
    genre: "Horror",
    ismovie: true,
  },
  {
    title: "Supersize Me",
    genre: "Documentary",
    ismovie: true,
  },
  {
    title: "Naked Gun",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Airplane",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "The Social Dilemma",
    genre: "Documentary",
    ismovie: true,
  },
  {
    title: "Christmas Vacation",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "The Matrix",
    genre: "Science Fiction",
    ismovie: true,
  },
  {
    title: "The Nightmare Before Christmas",
    genre: "Family",
    ismovie: true,
  },
  {
    title: "The Birds",
    genre: "Horror",
    ismovie: true,
  },
  {
    title: "The Blair Witch Project",
    genre: "Horror",
    ismovie: true,
  },
  {
    title: "High Fidelity",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Casablanca",
    genre: "Romance",
    ismovie: true,
  },
  {
    title: "Ghostbusters",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "Rocky",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "The Willoughbys",
    genre: "Family",
    ismovie: true,
  },
  {
    title: "Mr. Mom",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Space Balls",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Princess Bride",
    genre: "Adventure",
    ismovie: true,
  },
  {
    title: "The Karate Kid",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "Short Circuit",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "Uncle Buck",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "E.T.",
    genre: "Family",
    ismovie: true,
  },
  {
    title: "The Breakfast Club",
    genre: "Drama",
    ismovie: true,
  },
  {
    title: "Raiders of the Lost Arc",
    genre: "Adventure",
    ismovie: true,
  },
  {
    title: "Bill and Ted's Excellent Adventure",
    genre: "Adventure",
    ismovie: true,
  },
  {
    title: "Back to the Future",
    genre: "Adventure",
    ismovie: true,
  },
  {
    title: "A Christmas Story",
    genre: "Family",
    ismovie: true,
  },
  {
    title: "The Big Lebowski",
    genre: "Drama",
    ismovie: true,
  },
  {
    title: "Army of Darkness",
    genre: "Adventure",
    ismovie: true,
  },
  {
    title: "Office Space",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Clerks",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Robin Hood (Disney)",
    genre: "Family",
    ismovie: true,
  },
  {
    title: "Groundhog Day",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Don't F**k with Cats Hunting an Internet Killer",
    genre: "Documentary",
    ismovie: true,
  },
  {
    title: "The Vietnam War",
    genre: "Documentary",
    ismovie: true,
  },
  {
    title: "Over The Moon",
    genre: "Family",
    ismovie: true,
  },
  {
    title: "Jay & Silent Bob Strike Back",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "The Notebook",
    genre: "Romance",
    ismovie: true,
  },
  {
    title: "The Cabin in The Woods",
    genre: "Horror",
    ismovie: true,
  },
  {
    title: "Once Upon a Time in Hollywood...",
    genre: "Drama",
    ismovie: true,
  },
  {
    title: "Gone Girl",
    genre: "Drama",
    ismovie: true,
  },
  {
    title: "Napoleon Dynamite",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Interstellar",
    genre: "Science Fiction",
    ismovie: true,
  },
  {
    title: "Meru",
    genre: "Documentary",
    ismovie: true,
  },
  {
    title: "The Toy",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Blazing Saddles",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "inglourious basterds",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "The Godfather",
    genre: "Drama",
    ismovie: true,
  },
  {
    title: "Step Brothers",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Mary Poppins",
    genre: "Family",
    ismovie: true,
  },
  {
    title: "First Blood",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "Psycho",
    genre: "Horror",
    ismovie: true,
  },
  {
    title: "The Stanford Prison Experiment",
    genre: "Drama",
    ismovie: true,
  },
  {
    title: "Alien",
    genre: "Science Fiction",
    ismovie: true,
  },
  {
    title: "Challenger: The Final Flight",
    genre: "Documentary",
    ismovie: true,
  },
  {
    title: "Get Out",
    genre: "Horror",
    ismovie: true,
  },
  {
    title: "Butch Cassidy & the Sundance Kid",
    genre: "Adventure",
    ismovie: true,
  },
  {
    title: "The Good, The Bad, and The Ugly",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "The Life Aquatic with Steve Zissou",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Stripes",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "Drive",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "Pulp Fiction",
    genre: "Action",
    ismovie: true,
  },
  {
    title: "Kill Bill",
    genre: "Adventure",
    ismovie: true,
  },
  {
    title: "Natural Born Killers",
    genre: "Drama",
    ismovie: true,
  },
  {
    title: "Flight of the Navigator",
    genre: "Family",
    ismovie: true,
  },
  {
    title: "The Shining",
    genre: "Horror",
    ismovie: true,
  },
  {
    title: "Tremors",
    genre: "Horror",
    ismovie: true,
  },
  {
    title: "Planes, Trains and Automobiles",
    genre: "Comedy",
    ismovie: true,
  },
  {
    title: "The Animatrix",
    genre: "Science Fiction",
    ismovie: true,
  },
  {
    title: "Robo Cop",
    genre: "Action",
    ismovie: true,
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
