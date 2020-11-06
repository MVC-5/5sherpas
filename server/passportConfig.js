const db = require("./models");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, paswword, done) => {
      db.User.findOne({ email: username }, (err, user) => {
        console.log(username);
        if (err) done(err, null);
        if (!user) return done(null, false);
        bcrypt.compare(paswword, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else return done(null, false);
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    db.User.findOne({ _id: id }, (err, user) => {
      const userInfo = {
        email: user.email,
        name: user.name,
      };
      done(err, userInfo);
    });
  });
};
