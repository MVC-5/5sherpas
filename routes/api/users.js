const router = require("express").Router();
const controller = require("../../controllers");

// Matches with "/api/user"
router.post("/login", (req, res, next) => {
  controller.loginUser(req, res, next);
});

router.post("/logout", (req, res) => {
  controller.logoutUser(req, res);
});

router.post("/register", (req, res) => {
  controller.createUser(req, res);
});

router
  .route("/")
  .get((req, res) => res.send(req.user))
  .put(controller.updatePass);

router.route("/categories").put(controller.updateUserChallengeCategories);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(controller.findUserById)
  .put(controller.updateUserSettings);

module.exports = router;
