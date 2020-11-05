const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../../models");
const controller = require("../../controllers");

// Matches with "/api/user"
router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.send(`${user.username} is logged in`);
    });
  })(req, res, next);
});

router.post("/register", (req, res) => {
  console.log(req.body);
  db.User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new db.User({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.send("User created");
    }
  });
});

router.route("/").get(controller.findUser).post(controller.createUser);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(controller.findUserById)
  .put(controller.updateUserSettings);

module.exports = router;
