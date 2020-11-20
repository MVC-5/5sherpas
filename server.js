// dependency imports
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");

const routes = require("./routes");

dotenv.config();

//
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/5sherpas",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Mongoose is hooked up!")
);

// Middleware
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretcode"));

require("./passportConfig")(passport);

app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  console.log("prod env");
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use(routes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
